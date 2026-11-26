#import "@preview/charged-ieee:0.1.4": ieee

#show: ieee.with(
  title: [Software Code Generation Using IDEF0 Functional Diagrams and Large Language Models],
  abstract: [
    Large Language Models (LLMs) generate single functions accurately, but they make errors in multi-file programs. When a user writes one long prompt, the model changes argument names, mismatches data types, and breaks links between functions. This paper presents IDEF0 Studio, an editor that uses IDEF0 diagrams to guide LLM code generation. The editor converts Input-Control-Output-Mechanism (ICOM) arrows into function interfaces and sets a bottom-up generation order. Using an LLM, the editor runs two separate agents: a Generator Agent writes each Python function, and an isolated Verifier Agent plus a structural filter check the function against the ICOM diagram. If an error occurs, the Generator Agent fixes the function in at most three passes. Tests on 7 software programs (23 diagrams and 68 blocks) show that all 68 blocks pass both checks.
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
      name: "Fedor Mihailovich Panov",
      department: [Department of Computer Software and Information Technologies],
      organization: [Bauman Moscow State Technical University],
      location: [Moscow, Russia],
      email: "panovfm@student.bmstu.ru",
    ),
  ),
  index-terms: (
    "Generative AI",
    "Trustworthy AI",
    "Cognitive Engineering",
    "Human-Computer Interaction",
    "Functional Decomposition",
    "IDEF0",
    "Code Generation",
    "Human-in-the-Loop",
  ),
  bibliography: bibliography("refs.bib"),
)

#set text(font: ("TeX Gyre Termes", "Liberation Serif"))

= Introduction

Large Language Models (LLMs) generate single functions and boilerplate code quickly @chen2021evaluating @austin2021program @li2022competition. However, studies show that developers spend significant time reading, checking, and fixing AI-generated code @vaithilingam2022expectation @barke2023grounded. Production software needs explicit structure, exact interfaces, and valid links between functions @parnas1972criteria.

When a user describes a multi-step program in one text prompt, the model often misses details @sweller1988cognitive. The model renames arguments between calls, mismatches return values, or adds hidden dependencies @gou2024critic. This error occurs because an LLM predicts text one token at a time @vaswani2017attention, while a program has a tree structure.

Code checking is another hard task @olausson2024selfrepair. If one model generates and checks code in the same chat, it often misses its own errors @madaan2023selfrefine. Engineering workflows separate code generation from independent checking @zheng2023judging @chen2023codet @gou2024critic.

To solve these problems, we use IDEF0 software decomposition @nist1993idef0 @ieee1998idef0 @ross1977structured to guide LLMs step by step. We built IDEF0 Studio, a web and desktop (Tauri) editor in React and TypeScript. Engineers draw software diagrams in the editor or import `.rsf` models.

This paper makes four contributions:
+ *ICOM program structure:* converts IDEF0 diagrams into a bottom-up generation order.
+ *Two-agent verification:* runs separate Generator and Verifier agents with a rule-based filter and a three-pass repair loop.
+ *IDEF0 Studio editor:* runs live diagram checks, imports `.rsf` models, and generates Python functions step by step.
+ *Software evaluation:* tests 7 software programs (68 blocks) and compares IDEF0 generation with text-only prompting and multi-agent tools @hong2024metagpt @qian2024chatdev.

= Software Decomposition with IDEF0

Visual diagrams reduce mental load because they split large systems into small parts @sweller1988cognitive. The IDEF0 standard @marca1988sadt @nist1993idef0 defines each block with four arrow types (ICOM):
- *Inputs (I)*: data or arguments that enter from the left and change inside the function.
- *Controls (C)*: rules, settings, or flags that enter from the top and guide execution.
- *Outputs (O)*: return values or results that leave from the right.
- *Mechanisms (M)*: external libraries, engines, or helper functions that enter from the bottom.

Each IDEF0 block is written as a tuple:
$ A_i = (N_i, I_i, C_i, O_i, M_i, D_i) $

Here $N_i$ is the function name, $I_i, C_i, O_i, M_i$ are sets of named data arrows, and $D_i$ is the child diagram. For a leaf block, $D_i = emptyset$. Otherwise, $D_i$ is a directed graph $G_i = (V_i, E_i)$ that can include branches, merges, and feedback loops.

Parent and child diagrams must match at the borders @ieee1998idef0:
$ union.big_(v in V_i) "Ports"_("ext")(v) equiv I_i union C_i union O_i union M_i $

This rule ensures that every child function clearly lists its inputs, settings, outputs, and libraries. It prevents hidden global variables and missing arguments across levels @parnas1972criteria.

= Editor Design and Code Generation

IDEF0 Studio links a visual diagram canvas with a live diagram checker, a tree builder, and an LLM code generator (with optional `.rsf` model import).

#figure(
  image("images/01_context_diagram.png", width: 100%),
  caption: [Context diagram A-0 in IDEF0 Studio],
) <fig:context_en>

#figure(
  image("images/02_decomposition_diagram.png", width: 100%),
  caption: [Decomposition diagram A0 with orthogonal arrows and junctions],
) <fig:decomp_en>

As shown in @fig:context_en and @fig:decomp_en, the user sees the diagram tree, arrow properties, and live error checks in one window. Before code generation starts, the editor runs four structural rules on the diagrams:
- *Block Count Limit:* warns if one diagram contains more than six blocks, keeping complexity low.
- *Arrow Labels:* flags arrows that have no text label.
- *Attached Flows:* flags arrows whose start or end is not connected to a block or border.
- *Boundary Balance:* checks that all external ports on a child diagram match the parent block's ICOM arrows.

== Bottom-Up Generation Order
To avoid undefined function calls, the editor generates and checks child functions before their parent function. It walks the diagram tree $T$ from root $A_0$ in post-order:
$ sigma(A_i) = [sigma(A_(i,1)), sigma(A_(i,2)), ..., sigma(A_(i,k)), A_i] $

When a block has optional controls or feedback arrows, the prompt tells the LLM to use safe default values. This keeps the main entry function runnable without extra setup.

== Contract-Based Prompts
Instead of one giant prompt, the editor runs one continuous chat session. First, it sends a short overview of the whole program. Then, for each block in $sigma$, it sends a focused prompt with:
+ The function name and what the block must do.
+ The exact input arguments:
$ "Params"(A_i) = I_i union C_i union M_i $
+ The expected return values from $O_i$.
+ The exact names of child functions that the block must call.

To keep functions clean and self-contained, library imports stay inside each function body.

= Two-Agent Verification

A single LLM often ignores a control input $C_i$, returns the wrong tuple $O_i$, or adds global state @gou2024critic @olausson2024selfrepair. IDEF0 Studio prevents these errors by separating generation and checking into two agents: a *Generator Agent* and a *Verifier Agent*.

#figure(
  image("images/03_pipeline_en.svg", width: 100%),
  caption: [Two-agent code generation and verification workflow],
) <fig:pipeline_en>

== Two-Stage Checking
As shown in @fig:pipeline_en, the Generator Agent ($M_"gen"$) writes a candidate function $c_i$ for block $A_i$ inside a continuous chat session. Next, two gates check the code:

+ *Structural Filter:* checks that the code has a function definition, a return statement, and calls to all child functions. It blocks global variables, wrapper classes, and leftover IDEF0 terms.
+ *Verifier Agent ($M_"ver"$):* runs in a completely separate session without $M_"gen"$'s chat history. It receives only the candidate code $c_i$, the ICOM specification $(I_i, C_i, O_i, M_i)$, and the child function names. Because the two agents do not share chat history, the verifier avoids confirmation bias @zheng2023judging @shinn2023reflexion.

== Verification Rules
The verifier checks four rules and returns `passed` (`true` or `false`) along with a list of errors $R_i$:
- *Full ICOM Match:* the code uses every argument in $I_i union C_i union M_i$ and returns the exact outputs in $O_i$.
- *Child Calls:* non-leaf blocks ($D_i != emptyset$) call all child functions instead of using fake stubs.
- *No Side Effects:* the function stays pure and does not modify global state.
- *Safe Edge Cases:* the code handles default control values, empty inputs, and zero division safely.

== Three-Pass Repair Loop
If the structural filter or verifier rejects $c_i$, the editor asks $M_"gen"$ to fix only the errors listed in $R_i$. This loop runs at most $K_"max" = 3$ times @madaan2023selfrefine. If errors remain after three tries, the editor marks the block with a warning so the engineer can check the diagram or fix arrow labels. Every module passes both checks before parent blocks call it.

== Example: Handwritten Solution OCR Program
Consider the "Handwritten Solution Recognition" program. The top block `A-0` takes "Photo or scan of handwritten text" as Input and produces "Digital text and solution grade" as Output, using "Text and data analysis algorithms" as Control and "OCR model and task database" as Mechanism. Diagram `A0` splits this into five steps (`A1`--`A5`), summarized in @tab:case_en.

#figure(
  table(
    columns: (0.45fr, 1.15fr, 1.35fr, 0.95fr),
    inset: 4pt,
    stroke: (x, y) => if y == 0 { (top: 0.8pt, bottom: 0.8pt) } else if y == 6 { (bottom: 0.8pt) } else { none },
    align: (center, left, left, left),
    [*Block*], [*Function Role*], [*Inputs / Controls ($I, C$)*], [*Outputs ($O$)*],
    [`A1`], [Image Capture], [Raw photo or scan], [Normalized image],
    [`A2`], [Preprocessing], [Normalized image, noise filter], [Clean binary image],
    [`A3`], [Text Recognition], [Clean image, OCR model], [Extracted text],
    [`A4`], [Reference Check], [Extracted text, task database], [Comparison score],
    [`A5`], [Grade Assignment], [Comparison score, grading rules], [Final digital grade],
    [`A0`], [Root Coordinator], [Calls `A1`--`A5` in sequence], [Text and grade],
  ),
  caption: [ICOM Contract Mapping for the Handwritten Solution OCR Program],
) <tab:case_en>

The editor generates leaf functions `A1`--`A5` first, and then creates the parent function `A0` that calls all five verified functions with exact ICOM arguments.

= Evaluation

== Experimental Setup
We ran our tests using the `korolev-k5` model hosted on the BMSTU AI assistant platform @korolev2025bmstu. The Generator Agent ran in a continuous chat with diagram context, and the Verifier Agent ran in an isolated session with no generator history.

== Software Program Generation Results
We tested end-to-end Python program generation ($K_"max" = 3$) on 7 software programs: matrix generation, handwritten OCR grading, classroom scheduling, exam proctoring, learning recommendations, schedule management, and automated bug fixing (23 diagrams and 68 blocks total). As shown in @tab:live, all 68 blocks passed both the structural filter and the Verifier Agent.

#figure(
  table(
    columns: (1.65fr, 0.45fr, 0.7fr, 0.7fr, 0.55fr),
    inset: 4pt,
    stroke: (x, y) => if y == 0 { (top: 0.8pt, bottom: 0.8pt) } else if y == 8 { (bottom: 0.8pt) } else { none },
    align: (left, center, center, center, center),
    [*Software Program*], [*Diagr.*], [*Leaf / Comp.*], [*ICOM Ports*], [*Verified*],
    [Fibonacci Matrix Generator], [3], [5 / 2], [25], [7 / 7],
    [Handwritten Solution OCR], [2], [5 / 1], [17], [6 / 6],
    [Classroom Schedule Optimization], [2], [5 / 1], [18], [6 / 6],
    [Exam Proctoring System], [2], [4 / 1], [14], [5 / 5],
    [Learning Recommender], [2], [4 / 1], [16], [5 / 5],
    [Schedule Management System], [10], [23 / 9], [103], [32 / 32],
    [Automated Bug-Fix Pipeline], [2], [6 / 1], [31], [7 / 7],
    [*Total (7 Software Programs)*], [*23*], [*52 / 16*], [*224*], [*68 / 68*],
  ),
  caption: [Structural Complexity and Verification Results Across 7 Software Programs],
) <tab:live>

== Comparison with Prompting Baselines
We compare our IDEF0-guided workflow against monolithic Zero-Shot @brown2020language and Few-Shot Chain-of-Thought (CoT) @wei2022chain prompting on the same 7 software programs (@tab:compare). Because IDEF0 splits each program into small ICOM-bound functions, the model avoids missing parameters and stub implementations that occur in long single-prompt outputs.

#figure(
  table(
    columns: (1.7fr, 0.7fr, 0.75fr, 0.75fr),
    inset: 4pt,
    stroke: (x, y) => if y == 0 { (top: 0.8pt, bottom: 0.8pt) } else if y == 3 { (bottom: 0.8pt) } else { none },
    align: (left, center, center, center),
    [*Method*], [*Syntax Valid (%)*], [*Full Functions (%)*], [*No Stubs (%)*],
    [Monolithic Zero-Shot], [57.1], [41.2], [62.0],
    [Monolithic Few-Shot CoT], [71.4], [58.8], [76.5],
    [*IDEF0-Guided Two-Agent*], [*100.0*], [*100.0*], [*100.0*],
  ),
  caption: [Comparison Across Prompting Methods on 7 Software Programs],
) <tab:compare>

== Comparison with Related Tools
Multi-agent tools like MetaGPT @hong2024metagpt and ChatDev @qian2024chatdev rely on free-form chat between AI roles. In contrast, IDEF0 Studio binds every prompt to clear ICOM diagram interfaces, which prevents interface drift across deep trees. Also, unlike single-chat self-repair @olausson2024selfrepair @madaan2023selfrefine, an isolated verifier avoids blind spots and gives engineers clear diagnostic notes @vaithilingam2022expectation @barke2023grounded.

= Human-in-the-Loop and Limitations

In standard AI coding tools, developers must read long code diffs to spot design errors @vaithilingam2022expectation @barke2023grounded. In IDEF0 Studio, the visual diagram connects the engineer and the AI. Live diagram checks catch missing labels, unattached arrows, and border mismatches before code generation starts. The engineer controls the high-level design, the generator writes small functions, and the verifier checks each contract.

== Limitations
The approach has three practical limits:
- *Diagram Label Quality:* unclear arrow names reduce generation and verification accuracy.
- *Extra Time and Tokens:* running a separate verifier (and up to three repair passes) takes more time and tokens than single-pass generation.
- *Basic Static Rules:* the structural filter checks text patterns and arrow names rather than full static type proofs.

= Conclusion

We presented IDEF0 Studio, a visual tool that uses IDEF0 functional diagrams to help LLMs generate modular Python programs. By generating functions bottom-up from ICOM interfaces and checking each block with a structural filter and an isolated Verifier Agent, the system keeps human control over software architecture. Tests on 7 software programs (68 blocks) show that all 68 blocks pass verification. Possible extensions include adding automated Python runtime execution tests (EEA) and expanding the software benchmark suite.
