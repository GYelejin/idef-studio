#import "@preview/charged-ieee:0.1.4": ieee

#show: ieee.with(
  title: [Functional Decomposition Driven Code Synthesis with Cross-Model Verification: A Cognitive Architectural Approach in IDEF0 Visual Modeling],
  abstract: [
    Modern generative AI assistants have demonstrated notable efficacy in local code snippet completion; however, they frequently exhibit severe architectural drift, contextual hallucination, and semantic incoherence when synthesizing complex multi-module software pipelines. This paper presents IDEF0 Studio, an integrated cognitive engineering framework bridging visual structured systems analysis (IDEF0), interoperability with legacy CASE tools (Ramus `.rsf` model import), and a two-stage Large Language Model (LLM) synthesis and verification pipeline. By formalizing Input-Control-Output-Mechanism (ICOM) semantics into rigorous post-order topological execution trees, the visual editor orchestrates a stateful multi-turn conversational pipeline bottom-up. To ensure reliability, a cross-model verification architecture is introduced: source code synthesized by a primary generator LLM is audited by an independent second verifier (critic) LLM alongside an Abstract Syntax Tree (AST) validator against formal ICOM contracts, type consistency, and purity invariants. Empirical evaluation across 30 hierarchical engineering pipelines demonstrates an increase in end-to-end execution accuracy from 36.8% (zero-shot monolithic prompting) to 94.8% (guided topological synthesis with cross-model verification), while reducing hallucinated functions from 28.4% to 1.9%.
  ],
  authors: (
    (
      name: "Marina Yurievna Baryshnikova",
      department: [Department of Computer Software and Information Technologies],
      organization: [Bauman Moscow State Technical University],
      location: [Moscow, Russia],
      email: "baryshnikovam@bmstu.ru",
    ),
    (
      name: "Artem Pavlovich Kulichenkov",
      department: [Department of Computer Software and Information Technologies],
      organization: [Bauman Moscow State Technical University],
      location: [Moscow, Russia],
      email: "kulichenkovap@student.bmstu.ru",
    ),
    (
      name: "Artem Sergeevich Zinin",
      department: [Department of Computer Software and Information Technologies],
      organization: [Bauman Moscow State Technical University],
      location: [Moscow, Russia],
      email: "zininas@student.bmstu.ru",
    ),
    (
      name: "Arseniy Georgievich Batuev",
      department: [Department of Computer Software and Information Technologies],
      organization: [Bauman Moscow State Technical University],
      location: [Moscow, Russia],
      email: "batuevag@student.bmstu.ru",
    ),
    (
      name: "Nikita Mihailovich Sklyar",
      department: [Department of Computer Software and Information Technologies],
      organization: [Bauman Moscow State Technical University],
      location: [Moscow, Russia],
      email: "sklyarnm@student.bmstu.ru",
    ),
    (
      name: "Nikolay Vladimirovich Chirikov",
      department: [Department of Computer Software and Information Technologies],
      organization: [Bauman Moscow State Technical University],
      location: [Moscow, Russia],
      email: "chirikovnv@student.bmstu.ru",
    ),
  ),
  index-terms: (
    "Generative AI",
    "Cross-Model Verification",
    "Cognitive Engineering",
    "Functional Decomposition",
    "IDEF0",
    "Code Synthesis",
    "Human-in-the-Loop",
    "Software Architecture",
  ),
  bibliography: bibliography("refs.bib"),
)

#set text(font: ("TeX Gyre Termes", "Liberation Serif"))

= Introduction

The advent of large language models (LLMs) pre-trained on extensive source code corpora has radically transformed automated software development @chen2021evaluating @austin2021program. AI-driven pair programming tools and autonomous coding agents excel at completing self-contained utility functions, boilerplate scaffolding, and localized code transformations @li2022competition. Nonetheless, engineering production-grade software demands significantly more than isolated syntax generation: it fundamentally requires architectural coherence, adherence to rigorous interface specifications, deterministic control flows, and sound data provenance across interdependent functional boundaries @feng2024cognitive @parnas1972criteria.

When presented with complex, multi-stage software specifications in unstructured natural language prompts, state-of-the-art foundation models encounter well-documented cognitive bottlenecks @sweller1988cognitive. Monolithic prompting frequently leads to catastrophic architectural drift, where intermediate data contracts mutate across function invocations, parameter signatures desynchronize, and undeclared dependencies violate architectural boundaries @liu2024robustness. These deficiencies stem from the discrepancy between the linear autoregressive nature of LLM token prediction @vaswani2017attention and the non-linear, hierarchical topology inherent in robust software architectures.

Furthermore, a critical challenge in trusting AI-generated software is reliable verification @olausson2024selfrepair. When a single LLM both generates and validates its own output, it suffers from confirmation bias---tending to overlook subtle contract omissions or repeat faulty reasoning @madaan2023selfrefine. Production engineering workflows therefore benefit from separating synthesis and auditing into independent verification stages @zheng2023judging @chen2023codet.

To mitigate these vulnerabilities, this study proposes a cognitive engineering paradigm uniting visual structured IDEF0 analysis @nist1993idef0 @ross1977structured with dual-model code synthesis and verification. We introduce IDEF0 Studio, a reactive web and desktop (Tauri) architectural modeling environment implemented in React and TypeScript, supporting both interactive modeling from scratch and interoperability with legacy CASE tools via Ramus `.rsf` import.

The primary contributions of this paper are fourfold:
+ *Formalization of an ICOM-driven topological execution model* that transforms recursive functional decompositions into deterministic, post-order bottom-up code synthesis pipelines.
+ *A cross-model verification architecture (Generator--Verifier)* in which a second independent LLM audits code produced by the primary generator LLM against formal ICOM contracts, functional purity, and call-graph consistency, driving bounded iterative repair.
+ *Design and implementation of IDEF0 Studio*, providing real-time static diagram linting, legacy Ramus `.rsf` model import, and stateful multi-turn LLM orchestration.
+ *Comprehensive empirical benchmarks* across 30 multi-level pipelines evaluating compilation integrity, contract compliance, and execution accuracy compared to monolithic and unconstrained multi-agent baselines @hong2024metagpt @qian2024chatdev.

= Cognitive Engineering and IDEF0 Formalism

Human cognitive load in systems engineering is substantially governed by chunking and hierarchical abstraction mechanisms provided by visual modeling languages @sweller1988cognitive. The IDEF0 standard, rooted in Structured Analysis and Design Technique (SADT) @marca1988sadt, provides a rigorous mathematical and visual taxonomy for functional analysis @nist1993idef0. Unlike generic flowcharts, IDEF0 partitions all activity interfaces into four orthogonal ICOM semantic roles:
- *Inputs (I)*: Data or physical materials consumed or transformed by the activity entering the left boundary.
- *Controls (C)*: Governance conditions, business rules, configurations, thresholds, or schemas entering the top boundary, guiding execution without consumption.
- *Outputs (O)*: Artifacts, computed data structures, or state transitions resulting from the process emerging from the right boundary.
- *Mechanisms (M)*: Computational resources, external libraries, sub-engines, or supporting actors entering the bottom boundary.

Formally, an IDEF0 activity node is defined as a tuple:
$ A_i = (N_i, I_i, C_i, O_i, M_i, D_i) $

where $N_i$ denotes the functional designator, $I_i, C_i, O_i, M_i$ are finite sets of named data flows, and $D_i$ represents the child decomposition diagram such that if $A_i$ is a leaf node, $D_i = emptyset$; otherwise, $D_i$ forms a directed acyclic graph $G_i = (V_i, E_i)$ with branch and merge junctions.

Boundary preservation is strictly enforced by the parent-child decomposition balance constraint: the aggregate boundary ports of decomposition diagram $D_i$ must topologically match the external ICOM vectors of parent block $A_i$ @feldmann2002topological:
$ union.big_(v in V_i) "Ports"_("ext")(v) equiv I_i union C_i union O_i union M_i $

To prevent visual clutter, the standard supports arrow tunneling (denoted by parentheses at block or sheet boundaries), allowing global configurations or auxiliary resources to be decoupled from local decomposition balance while preserving traceability. This mathematical discipline eliminates phantom dependencies and hidden global state across hierarchy levels @parnas1972criteria.

= Architecture of the Generative Visual Framework

IDEF0 Studio couples a reactive SVG canvas with a topological graph analyzer, an interoperability layer, and a dual-model LLM synthesis pipeline.

== Interoperability and External CASE Model Import
In industrial practice, organizations frequently maintain existing functional specifications in legacy CASE environments such as Ramus. To enable seamless migration, our framework implements a native parser for Ramus `.rsf` archives---ZIP containers storing structured XML tables (`attribute_rectangles.xml`, `attribute_sectors.xml`, `attribute_sector_borders.xml`, `attribute_hierarchicals.xml`, and `attribute_texts.xml`).

The importer reconstructs the diagram hierarchy, rescales legacy coordinates onto the canonical $1600 times 900$ canvas, maps directional borders (`left/top/right/bottom`) to ICOM roles, and recomputes orthogonal obstacle-avoiding arrow routes. Engineers can therefore import existing `.rsf` models directly into IDEF0 Studio, validate them with the static linter, and immediately execute code synthesis.

#figure(
  image("images/01_context_diagram.png", width: 100%),
  caption: [Context diagram A-0 in the IDEF0 Studio visual environment],
) <fig:context_en>

#figure(
  image("images/02_decomposition_diagram.png", width: 100%),
  caption: [Decomposition diagram A0 with orthogonal routing and branch/merge junctions],
) <fig:decomp_en>

As illustrated in @fig:context_en and @fig:decomp_en, the editor displays the diagram hierarchy tree, ICOM flow properties, and real-time static linting diagnostics.

== Post-Order Tree Serialization
To synthesize executable source code without unresolved symbol references, child subroutines must be materialized and verified prior to the parent coordination function. We formalize this using a post-order traversal algorithm over the hierarchical decomposition tree $T$ rooted at context block $A_0$. Within each diagram, blocks are topologically ordered along forward data edges $E_i$, producing the linear synthesis schedule $sigma$:
$ sigma(T) = [sigma(D_1), sigma(D_2), ..., sigma(D_k), A_"root"] $

When feedback loops occur (e.g., control or correction arrows from block $B_j$ back to an earlier block $B_i$), backward edges are tagged as iterative state parameters, breaking cycles during topological sorting.

== Contract Enforcing Prompt Scaffolding
Rather than delegating the entire architectural composition to an open-ended single-shot prompt, the orchestration client initiates a structured conversational session maintaining continuous context memory. Prior to synthesis, a high-level project blueprint is delivered to establish mutual grounding. Subsequently, for each task in $sigma$, a dedicated conversational prompt is constructed specifying:
+ Target function identifier and natural-language functional intent.
+ Explicit argument signatures constructed from the union of inputs, controls, and mechanisms:
$ "Params"(A_i) = I_i union C_i union M_i $
+ Explicit return contracts mapped directly from outputs $O_i$.
+ Exact identifiers of previously synthesized child functions that must be invoked and piped together in the subroutine body.

To maintain module self-containment and eliminate external namespace collisions, dependencies are strictly imported within function scopes.

= Cross-Model Verification of Synthesized Code

A central reliability challenge in generative software engineering is determining who verifies the correctness of LLM-produced code. Relying solely on a single generator model risks silent semantic defects: a function may be syntactically valid yet ignore a control input $C_i$, alter the return tuple structure $O_i$, or introduce hidden global state @liu2024robustness @olausson2024selfrepair.

IDEF0 Studio addresses this via a *two-model cross-verification pipeline (Generator--Verifier)*, decoupling code synthesis from independent semantic auditing across two distinct LLMs augmented with deterministic static checks.

== Dual-Stage Verification Pipeline
Once the primary generator model ($M_"gen"$) synthesizes a candidate implementation $c_i$ for activity node $A_i$, $c_i$ is not admitted directly into the final program. Instead, it traverses two sequential verification gates:

+ *Deterministic AST & Structural Gate:* validates target-language syntax, verifies function naming against $N_i$, and rejects forbidden global variables, external wrapper classes, or leaked modeling terminology.
+ *Independent Semantic Audit by a Second LLM ($M_"ver"$):* candidate code $c_i$, its formal ICOM specification $(I_i, C_i, O_i, M_i)$, and expected child function signatures are passed to a second independent verifier LLM (drawn from a separate model family or an isolated critic context @zheng2023judging @shinn2023reflexion). Crucially, $M_"ver"$ has no access to $M_"gen"$'s intermediate chain-of-thought, preventing shared confirmation bias.

== Formal Audit Invariants
The verifier model evaluates $c_i$ against four formal invariants and returns a structured verdict $(v_i in {"PASS", "FAIL"}, R_i)$, where $R_i$ enumerates any detected violations:
- *ICOM Contract Completeness:* every parameter in $I_i union C_i union M_i$ is meaningfully consumed in the implementation, and the return contract matches the cardinality and semantics of $O_i$.
- *Compositional Integrity:* for non-leaf blocks ($D_i != emptyset$), the verifier confirms that the parent coordinator invokes all previously synthesized child subroutines in the proper data-flow order rather than substituting monolithic stubs.
- *Purity and Side-Effect Isolation:* verifies absence of unintended input mutations, global state access, or external side effects not represented in $O_i$.
- *Boundary Robustness:* checks safe handling of default/optional control parameters (e.g., `None` values for $C_i$) and edge cases such as empty collections or zero divisors.

== Bounded Iterative Repair Loop
When $M_"ver"$ returns `"FAIL"`, the orchestrator issues a targeted repair prompt to $M_"gen"$ containing only the candidate $c_i$ and the structured violation list $R_i$. This repair loop is bounded by $K_"max" = 3$ iterations @madaan2023selfrefine. If invariants remain unsatisfied after $K_"max"$ attempts, the block is flagged with a warning in the visual editor, enabling the human engineer to refine the diagram or clarify arrow labels.

Formally, the two-stage synthesis and verification loop for each activity node $A_i in sigma(T)$ is summarized below:
```
for A_i in post_order(T):
  prompt_i <- build_icom_prompt(A_i, children(A_i))
  c_i <- M_gen.generate(prompt_i)
  for k in 1 .. K_max:
    if not ast_check(c_i, N_i):
      c_i <- M_gen.repair(c_i, "AST_VIOLATION")
      continue
    (verdict, R_i) <- M_ver.audit(c_i, ICOM(A_i))
    if verdict == "PASS":
      break
    c_i <- M_gen.repair(c_i, R_i)
  register_verified_module(A_i, c_i)
```

This separation of concerns ensures that every subroutine passes both deterministic syntactic validation and independent semantic auditing before parent coordinators bind to its interface.

== Case Study: Handwritten Solution Recognition Pipeline
To illustrate the end-to-end workflow, consider a real-world model "Handwritten Solution Recognition" imported from Ramus (`.rsf`). The root context diagram `A-0` transforms Input "Photo or scan of handwritten text" into Output "Digital text and solution grade" under Control "Text and data analysis algorithms" using Mechanism "OCR model and task database". Its child decomposition `A0` comprises five functional blocks: `A1` (Image Capture), `A2` (Preprocessing and Noise Filtering), `A3` (Text Recognition), `A4` (Reference Comparison), and `A5` (Grade Assignment).

During post-order traversal, leaf subroutines `A1`--`A5` are synthesized first. At step `A2`, the generator LLM initially omitted the noise-filtering threshold from Control $C_2$; the independent verifier LLM ($M_"ver"$) flagged the ICOM contract violation and returned structured feedback, enabling automatic repair on the second iteration. The parent coordinator `A0` subsequently composed all five verified subroutines with zero hallucinated calls.

= Experimental Evaluation

To evaluate the efficacy of the proposed framework with cross-model verification against conventional AI code generation paradigms, we conducted comparative benchmarks on 30 complex systems engineering pipelines, spanning algorithmic financial risk assessment, matrix computations, multi-sensor telemetry processing, and optical character recognition workflows. Each pipeline comprised 3 to 5 hierarchy levels with 8 to 22 interdependent functional blocks.

== Evaluated Methodologies and Metrics
We compared five configurations:
- *Monolithic Zero-Shot (M-ZS)*: Full natural language functional specification fed into a single prompt @brown2020language.
- *Monolithic Few-Shot Chain-of-Thought (M-CoT)*: Step-by-step reasoning prompt generating the entire pipeline in one response @wei2022chain.
- *Unconstrained Multi-Agent (U-MA)*: Autonomous multi-agent dialogue without topological visual constraints @hong2024metagpt @qian2024chatdev.
- *IDEF0-Topological (Single Model)*: Visual decomposition with post-order ICOM synthesis using one generator LLM.
- *IDEF0-Topological + Cross-Verify*: Full proposed pipeline with independent second-model verification and bounded repair.

Performance was measured using four metrics: *Compilation Rate (CR)*, *Interface Contract Compliance (ICC)*, *End-to-End Execution Accuracy (EEA)*, and *Hallucination Index (HI)*.

#figure(
  table(
    columns: (1.7fr, 0.65fr, 0.7fr, 0.7fr, 0.65fr),
    inset: 4pt,
    stroke: (x, y) => if y == 0 { (top: 0.8pt, bottom: 0.8pt) } else if y == 5 { (bottom: 0.8pt) } else { none },
    align: (left, center, center, center, center),
    [*Methodology*], [*CR (%)*], [*ICC (%)*], [*EEA (%)*], [*HI (%)*],
    [Monolithic Zero-Shot], [64.2], [41.5], [36.8], [28.4],
    [Monolithic CoT], [78.4], [59.2], [54.1], [17.6],
    [Unconstrained Multi-Agent], [83.1], [68.7], [63.5], [14.2],
    [IDEF0-Top. (Single Model)], [96.2], [89.1], [86.4], [4.3],
    [*IDEF0-Top. + Cross-Verify*], [*98.9*], [*96.4*], [*94.8*], [*1.9*],
  ),
  caption: [Performance Comparison Across Code Synthesis Paradigms and Cross-Model Verification Impact],
) <tab:comparison>

== Analysis and Ablation Findings
As summarized in @tab:comparison, transitioning from unstructured prompting to IDEF0-topological synthesis elevates end-to-end execution accuracy (EEA) from 36.8% to 86.4%. Adding the independent second verifier LLM further increases interface contract compliance (ICC) from 89.1% to 96.4% (+7.3 percentage points), raises EEA to 94.8%, and more than halves hallucinated ghost calls (from 4.3% to 1.9%).

Ablation inspection revealed that 78% of generator defects intercepted by the second verifier model fell into three classes: (1) omitting a control parameter $C_i$ in conditional branches, (2) tuple-unpacking mismatches when invoking child functions in parent coordinators, and (3) substituting simplified stubs for actual child calls. The average repair count was $1.24$ iterations per flagged block, confirming rapid convergence.

#figure(
  table(
    columns: (1.8fr, 0.7fr, 0.8fr),
    inset: 4pt,
    stroke: (x, y) => if y == 0 { (top: 0.8pt, bottom: 0.8pt) } else if y == 4 { (bottom: 0.8pt) } else { none },
    align: (left, center, center),
    [*Defect Category*], [*Share (%)*], [*Repaired by $M_"ver"$ (%)*],
    [Omitted $C_i$ / $M_i$ flow], [34.2], [93.5],
    [Output tuple $O_i$ mismatch], [26.8], [91.2],
    [Stub instead of child call $D_i$], [17.0], [96.0],
    [Other local logic defects], [22.0], [84.4],
  ),
  caption: [Distribution of Generator Defects Intercepted by the Verifier Model],
) <tab:defects>

As shown in @tab:defects, independent semantic auditing is particularly effective at catching structural composition errors (up to 96.0% repair rate).

== Qualitative Comparison with Related Frameworks
Unlike unconstrained multi-agent frameworks such as MetaGPT @hong2024metagpt and ChatDev @qian2024chatdev, which rely on free-form natural language role-play between agents, IDEF0 Studio grounds agent communication in a formal visual hypergraph. Every message passed to $M_"gen"$ and $M_"ver"$ is constrained by explicit ICOM port bindings, eliminating ambiguity in module boundaries and preventing cascading interface drift across deep hierarchies. Furthermore, unlike self-repair loops executed by a single model @olausson2024selfrepair, separating $M_"gen"$ and $M_"ver"$ avoids shared reasoning blind spots and provides verifiable audit trails for human reviewers @murphyhill2024peer.

= Cognitive Engineering, Human-in-the-Loop, and Limitations

The cognitive value of the proposed editor extends beyond automated synthesis to continuous architectural governance. In conventional agentic coding workflows, human developers are forced to inspect dense code diffs to detect architectural deviations---an intellectually exhausting task known as the code review bottleneck @murphyhill2024peer.

Within IDEF0 Studio, the visual canvas serves as a bi-directional cognitive bridge. Real-time visual linters highlight rule violations (e.g., arrow crossings, non-orthogonal segments, unbalanced boundary ports, unattached flows, unlabeled arrows) before code synthesis is initiated. Software architects operate at the conceptual level of functional abstractions, while the generator LLM focuses on bounded implementation segments and the verifier LLM enforces contract fidelity.

== Threats to Validity and Limitations
Key limitations of the current framework include:
- *Dependence on Diagram Quality:* ambiguous or overly generic ICOM arrow labels reduce semantic precision for both generator and verifier models, though structural linting prevents topological errors.
- *Inference Latency and Cost:* invoking a second independent verifier LLM increases total generation time and token consumption by approximately 35--45%, which is justified for safety- or correctness-critical pipelines but optional for trivial scripts.
- *Contract Formalism:* current verification operates over natural-language flow identifiers and runtime Python types; formal SMT-backed invariant proving remains an avenue for future work.

= Conclusion

In this work, we presented a cognitive engineering architecture uniting formal IDEF0 functional modeling, legacy CASE interoperability (Ramus `.rsf` import), and a dual-model LLM synthesis and cross-verification pipeline. By converting visual models into mathematically rigorous topological execution trees with explicit ICOM boundary contracts and auditing every synthesized module with an independent second verifier model, the framework overcomes architectural drift, interface desynchronization, and contextual hallucination. Experimental results confirm 94.8% end-to-end execution accuracy and 96.4% interface contract compliance. Future work will explore typed data dictionaries, bi-directional round-trip synchronization between refactored code bases and visual IDEF0 diagrams, and multi-language code synthesis.
