#import "@preview/charged-ieee:0.1.4": ieee

#show: ieee.with(
  title: [Software Code Generation Using IDEF0 Functional Diagrams and Large Language Models],
  abstract: [
    Large Language Models (LLMs) generate single functions accurately, but they make errors in multi-file programs. When a user writes one long prompt, the model changes argument names, mismatches data types, and breaks links between functions. This paper presents IDEF0 Studio, an editor that uses IDEF0 diagrams to guide LLM code generation. The editor converts Input-Control-Output-Mechanism (ICOM) arrows into function interfaces and sets a bottom-up generation order. Using an LLM, the editor runs two separate agents: a Generator Agent writes each Python function, and an isolated Verifier Agent (without generator chat history and with a separate auditor system prompt) plus a structural filter check the function against the ICOM diagram. If an error occurs, the Generator Agent fixes the function in at most three passes. Offline checks across 16 IDEF0 models (55 diagrams, 158 blocks, 474 ICOM ports) and 479 unit tests confirm 100.0% bottom-up scheduling and structural assembly. In live LLM evaluation (`korolev-k5`) up to the 5-hour API token quota, 14 of 16 models (50 diagrams, 144 blocks) completed with 100.0% Python `ast.parse` syntax validity: 65.3% (94/144) passed on the first attempt, bounded repair rescued another 28.5% (41/144), raising total verification to 93.8% (135/144), while 6.2% (9/144) were flagged for manual review.
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
#show raw.where(block: true): set text(size: 7.5pt)

= Introduction

Large Language Models (LLMs) generate single functions and boilerplate code quickly @chen2021evaluating @austin2021program @li2022competition. However, studies show that developers spend significant time reading, checking, and fixing AI-generated code @vaithilingam2022expectation @barke2023grounded. Production software needs explicit structure, exact interfaces, and valid links between functions @parnas1972criteria.

When a user describes a multi-step program in one text prompt, the model often misses details @sweller1988cognitive. The model renames arguments between calls, mismatches return values, or adds hidden dependencies @gou2024critic. This error occurs because an LLM predicts text one token at a time @vaswani2017attention, while a program has a tree structure.

Code checking is another hard task @olausson2024selfrepair. If one model generates and checks code in the same chat, it often misses its own errors @madaan2023selfrefine. Engineering workflows separate code generation from independent checking @zheng2023judging @chen2023codet @gou2024critic.

To solve these problems, we use IDEF0 software decomposition @nist1993idef0 @ieee1998idef0 @ross1977structured to guide LLMs step by step. We built IDEF0 Studio, a web and desktop (Tauri) editor in React and TypeScript. Engineers draw software diagrams in the editor or import `.rsf` models.

This paper makes four contributions:
+ *ICOM program structure:* converts IDEF0 diagrams into a bottom-up generation order.
+ *Two-agent verification:* runs separate Generator and Verifier agents with a rule-based filter and a three-pass repair loop.
+ *IDEF0 Studio editor:* runs live diagram checks, imports `.rsf` models, and generates Python functions step by step.
+ *Empirical evaluation:* tests 16 IDEF0 models offline (158 blocks, 481 unit tests) and evaluates live Python generation on 14 models (144 blocks), measuring first-pass rate, repair gain, `ast.parse` validity, and qualitative differences from multi-agent tools @hong2024metagpt @qian2024chatdev.

= Software Decomposition with IDEF0

Visual diagrams reduce mental load because they split large systems into small parts @sweller1988cognitive. The IDEF0 standard @marca1988sadt @nist1993idef0 defines each block with four arrow types (ICOM):
- *Inputs (I)*: data or arguments that enter from the left and change inside the function.
- *Controls (C)*: rules, settings, or flags that enter from the top and guide execution.
- *Outputs (O)*: return values or results that leave from the right.
- *Mechanisms (M)*: external libraries, engines, or helper functions that enter from the bottom.

Each IDEF0 block is written as a tuple:
$ A_i = (N_i, I_i, C_i, O_i, M_i, D_i) $

Here $N_i$ is the function name, $I_i, C_i, O_i, M_i$ are sets of named data arrows, and $D_i$ is the child diagram (empty for a leaf block; otherwise a directed graph that can include branches, merges, and feedback loops).

Parent and child diagrams must match at the borders @ieee1998idef0: every arrow entering or leaving a child diagram $D_i$ must correspond to an arrow in $I_i union C_i union O_i union M_i$ on its parent block $A_i$. This rule ensures that every child function clearly lists its inputs, settings, outputs, and libraries, preventing hidden global variables and missing arguments across levels @parnas1972criteria.

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

To keep functions clean and self-contained, library imports stay inside each function body. The Generator Agent is initialized with a fixed system prompt and receives a structured user prompt for each block (translated to English from the codebase):

```text
[Generator System Prompt]
You are a lead Python functional programming engineer.
We build a complete working application in one continuous dialog.
Implement exactly one pure function per step:
1. Use snake_case names; place all imports INSIDE the function body.
2. Start with `def <fn_name>(...):` and end with `return ...`.
3. Use standard Python types; provide safe defaults for controls.
4. No classes, global variables, side effects, or IDEF0/ICOM terms.
5. Call previously defined child functions with matching types.
6. Return ONLY valid Python code with no extra prose.

[Block User Prompt]
Step <i> of <N>: Implement `def <fn_name>(...):`. Purpose: <name>.
Inputs: <I_i, C_i, M_i> | Expected return: <O_i>
Child functions to call and pipe: <child_1, child_2, ...>
```

= Two-Agent Verification

A single LLM often ignores a control input $C_i$, returns the wrong tuple $O_i$, or adds global state @gou2024critic @olausson2024selfrepair. IDEF0 Studio prevents these errors by separating generation and checking into two agents: a *Generator Agent* and a *Verifier Agent*.

#figure(
  image("images/03_pipeline_en.svg", width: 100%),
  caption: [Two-agent code generation and verification workflow],
) <fig:pipeline_en>

== Two-Stage Checking
As shown in @fig:pipeline_en, the Generator Agent ($M_"gen"$) writes a candidate function $c_i$ for block $A_i$ inside a continuous chat session. Next, two gates check the code:

+ *Structural Filter:* checks that the code has a function definition, a return statement, and calls to all child functions. It blocks global variables, wrapper classes, and leftover IDEF0 terms.
+ *Verifier Agent ($M_"ver"$):* after generation, a separate agent is invoked *without any chat history* and with a *different system prompt* (`temperature = 0.0`). It receives only the candidate code $c_i$, the ICOM specification $(I_i, C_i, O_i, M_i)$, and the child function names. Because the two agents do not share chat history, the verifier avoids confirmation bias @zheng2023judging @shinn2023reflexion:

```text
[Verifier System Prompt]
You are an independent Python code auditor. You have NOT seen the
generation history. Check the function strictly against the spec:
1) all input, control, and mechanism args are used (or have defaults);
2) the return value matches expected outputs;
3) all listed child functions are called in the body;
4) no global variables or hidden side effects.
Reply STRICTLY in JSON: {"verdict": "PASS" | "FAIL", "issues": [...]}.

[Verifier User Prompt]
Function: <fn_name> (task: "<name>")
Inputs: <I_i> | Controls: <C_i> | Mechanisms: <M_i>
Expected outputs: <O_i> | Child functions: <children>
Code to verify: ```python <c_i> ```
```

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

== Corpus and Live Generation Results
The full repository corpus contains 16 IDEF0 models (2 native studio models and 14 models imported from `.rsf` archives), totaling 55 diagrams, 158 functional blocks (119 leaf, 39 composite), and 474 bound ICOM ports (mean 3.00 per block). Offline structural harness checks (`--dry-run`) and the 481-test unit suite pass 100.0% across all 16 models.

In the live benchmark (`K_max = 3`), 14 of 16 models (50 diagrams, 144 blocks) completed before reaching the API gateway's 5-hour token quota (`tokens_5h`) on the 15th model. As detailed in @tab:live, all 14 assembled `main.py` modules (100.0%) passed Python `ast.parse` syntax validation. Across 144 blocks, 94 (65.3%) passed both checks on the first attempt, while the bounded repair loop fixed another 41 blocks (28.5%) using 89 total repair iterations (mean 0.62 repairs/block), reaching 93.8% (135/144) verified blocks. The remaining 9 blocks (6.2%) across 4 models exceeded $K_"max" = 3$ and were flagged with a `warning` for manual inspection.

#figure(
  table(
    columns: (1.55fr, 0.4fr, 0.55fr, 0.65fr, 0.5fr, 0.4fr),
    inset: 3.5pt,
    stroke: (x, y) => if y == 0 { (top: 0.8pt, bottom: 0.8pt) } else if y == 15 { (bottom: 0.8pt) } else { none },
    align: (left, center, center, center, center, center),
    [*Model File*], [*Diag.*], [*1st-Pass*], [*Verified*], [*Rep./Blk*], [*AST*],
    [`example-model.json`], [2], [2 / 5], [5 / 5 (100%)], [1.00], [OK],
    [`fibonacci-matrix-model.json`], [3], [5 / 7], [7 / 7 (100%)], [0.57], [OK],
    [`automated-bug-fix-pipeline.json`], [2], [7 / 7], [7 / 7 (100%)], [0.00], [OK],
    [`cinema-trip-planner.json`], [4], [6 / 13], [11 / 13 (85%)], [1.15], [OK],
    [`classroom-schedule-optimizer.json`], [2], [4 / 6], [6 / 6 (100%)], [0.50], [OK],
    [`exam-proctoring-monitor.json`], [2], [5 / 5], [5 / 5 (100%)], [0.00], [OK],
    [`fibonacci-matrix-variant-a.json`], [6], [12 / 17], [16 / 17 (94%)], [0.53], [OK],
    [`fibonacci-matrix-variant-b.json`], [3], [2 / 7], [4 / 7 (57%)], [2.00], [OK],
    [`handwritten-solution-ocr.json`], [2], [3 / 6], [6 / 6 (100%)], [0.50], [OK],
    [`learning-recommender.json`], [2], [4 / 5], [5 / 5 (100%)], [0.20], [OK],
    [`ml-production-analytics.json`], [3], [8 / 10], [10 / 10 (100%)], [0.30], [OK],
    [`plane-points-bisector.json`], [3], [2 / 8], [5 / 8 (63%)], [1.63], [OK],
    [`program-error-fixer.json`], [6], [14 / 16], [16 / 16 (100%)], [0.13], [OK],
    [`schedule-management-system.json`], [10], [20 / 32], [32 / 32 (100%)], [0.53], [OK],
    [*Total Live (14 / 16)*], [*50*], [*94 / 144*], [*135 / 144 (93.8%)*], [*0.62*], [*14/14*],
  ),
  caption: [Live Python Generation, Independent Verification, and `ast.parse` Results (`korolev-k5`)],
) <tab:live>

== Effect of Independent Verification and Repair
The live results directly show the value of separating generation and checking: without the Verifier Agent and repair loop, only 65.3% (94/144) of functions satisfied all ICOM and structural rules on the first pass. Bounded iterative repair recovered +28.5% (41/144) of blocks, while cleanly isolating the 9 hardest blocks (6.2%) for human review rather than silently shipping broken interfaces.

== Comparison with Monolithic Prompting Baselines
We further compared our IDEF0-guided workflow against Monolithic Zero-Shot @brown2020language and Monolithic Few-Shot Chain-of-Thought (CoT) @wei2022chain prompting on 5 deterministic mathematical and scheduling programs (73 blocks total) using `korolev-k5`. As summarized in @tab:compare, while all methods produced syntactically valid Python (`ast.parse` 5/5), monolithic Zero-Shot and CoT implemented only 76.7% (56/73) and 84.9% (62/73) of required non-stub functions, compared to *93.2% (68/73)* for IDEF0-guided synthesis. On the largest 32-block system (`schedule-management-system`), IDEF0 achieved 100.0% (32/32) completeness versus 71.9% (23/32) for Zero-Shot and 75.0% (24/32) for CoT.

#figure(
  table(
    columns: (1.7fr, 0.7fr, 0.85fr, 0.85fr),
    inset: 4pt,
    stroke: (x, y) => if y == 0 { (top: 0.8pt, bottom: 0.8pt) } else if y == 3 { (bottom: 0.8pt) } else { none },
    align: (left, center, center, center),
    [*Method*], [*AST Valid*], [*All 73 Blocks*], [*32-Block System*],
    [Monolithic Zero-Shot], [5 / 5], [56 / 73 (76.7%)], [23 / 32 (71.9%)],
    [Monolithic Few-Shot CoT], [5 / 5], [62 / 73 (84.9%)], [24 / 32 (75.0%)],
    [*IDEF0-Guided Two-Agent*], [*5 / 5*], [*68 / 73 (93.2%)*], [*32 / 32 (100.0%)*],
  ),
  caption: [Comparison Against Monolithic Prompting Baselines on 5 Programs (`korolev-k5`)],
) <tab:compare>

== Comparison with Related Tools
Multi-agent tools like MetaGPT @hong2024metagpt and ChatDev @qian2024chatdev rely on free-form chat between AI roles. In contrast, IDEF0 Studio binds every prompt to clear ICOM diagram interfaces, which prevents interface drift across deep trees. Also, unlike single-chat self-repair @olausson2024selfrepair @madaan2023selfrefine, an isolated verifier avoids blind spots and gives engineers clear diagnostic notes @vaithilingam2022expectation @barke2023grounded.

= Human-in-the-Loop and Limitations

In standard AI coding tools, developers must read long code diffs to spot design errors @vaithilingam2022expectation @barke2023grounded. In IDEF0 Studio, the visual diagram connects the engineer and the AI. Live diagram checks catch missing labels, unattached arrows, and border mismatches before code generation starts. The engineer controls the high-level design, the generator writes small functions, and the verifier checks each contract.

== Limitations
The approach has four practical limits:
- *Partial Live Coverage:* due to the 5-hour token quota, 14 of 16 corpus models completed the full live verification run (while 5 pure math/scheduling models were evaluated in the baseline comparison).
- *Diagram Label Quality:* unclear arrow names reduce generation and verification accuracy.
- *Extra Time and Tokens:* running a separate verifier (and up to three repair passes) takes more time and tokens than single-pass generation.
- *Basic Static Rules:* the structural filter checks text patterns and `ast.parse` syntax rather than full static type proofs or runtime unit tests.

= Conclusion

We presented IDEF0 Studio, a visual tool that uses IDEF0 functional diagrams to help LLMs generate modular Python programs. By generating functions bottom-up from ICOM interfaces and checking each block with a structural filter and an isolated Verifier Agent, the system keeps human control over software architecture. Offline checks confirm 100.0% assembly across 16 models (158 blocks, 481 unit tests), live evaluation on 14 models (144 blocks) achieves 100.0% `ast.parse` validity and 93.8% contract verification (+28.5% over 65.3% first-pass), and baseline comparison on 5 programs (73 blocks) shows 93.2% completeness versus 76.7% (Zero-Shot) and 84.9% (CoT). Future work includes completing the remaining 2 models and adding automated runtime execution tests (EEA).
