## Solana
### solana level of invocation
Imagine a series of programs calling each other in a single transaction:

-   **Level 1:**  Your transaction begins by invoking  **Program A**.
-   **Level 2:**  During its execution, Program A performs a CPI to call  **Program B**.
-   **Level 3:**  Program B then performs a CPI to call  **Program C**.
-   **Level 4:**  Program C calls  **Program D**.
-   **Level 5:**  Program D calls  **Program E**.
-   **Attempt at Level 6:**  If Program E were to attempt a CPI to call Program F, the transaction would fail with a  `CallDepth`  error because it would exceed the 5-level limit.

this means tha the error occured during the 1st level of invocation

## what does 5 maximum level of invocation possible means

In Solana, the "maximum 5 levels of invocation" refers to the call stack depth for a transaction's instructions

. This limit is a built-in safety mechanism to prevent infinite loops and manage computational resources.

Here's a breakdown of what that means in practice:

-   **The total limit is 5:**  The runtime environment's instruction stack has a maximum height of 5.
-   **The first instruction occupies one level:**  The initial instruction in a transaction is considered the first level of the invocation stack.
-   **The remaining 4 levels are for Cross-Program Invocations (CPIs):**  A CPI is when one program calls another program. After the initial instruction, a program can perform up to four nested CPIs, reaching a total depth of 5.

