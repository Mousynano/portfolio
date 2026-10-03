## Research question

Adaptive cruise control has to regulate following behavior without reducing the problem to a single “best” objective value. The current study asks how a canonical Differential Evolution baseline and several modern DE-family variants behave when tuning a PID-based controller under repeated optimization, dynamic-response, robustness, and safety evaluation.

## Current experiment design

The current comparison includes **Genetic Algorithm, canonical Differential Evolution, FVRADE, RNEGDE, Neighborhood-SHADE, and DE-NPS-FP**. Each objective is evaluated through repeated independent runs using a common population and iteration budget so the comparison does not quietly give one method more computational opportunity than another.

The software records convergence behavior, objective values, time-response metrics, safety measures such as TTC/TTE, and robustness under multiple physical-parameter scenarios. The statistical audit includes distribution checking and paired non-parametric comparisons rather than treating one lucky run as a result.

## My contribution

I work on the simulation and optimization software, experimental pipeline, statistical auditing, robustness scenarios, visualization, technical analysis, and manuscript development. This is the research project where my software contribution and methodological ownership are broad enough to discuss the full engineering workflow directly.

## What the current results suggest

The most important current finding is not a dramatic winner. Several DE-family methods converge into effectively the same boundary-active region, with extremely small median differences in the resulting objective values. The more interesting differences appear in runtime overhead, convergence behavior, and dispersion across repeated runs.

That shifts the research question from “which optimizer has the lowest single number?” toward whether additional algorithmic complexity produces a practically meaningful control improvement under a fixed evaluation budget.

## Status and limitation

The study is active and the manuscript is still being refined. Results are simulation-based. They should not be interpreted as a road-ready vehicle controller without physical validation, sensor and actuator constraints, implementation latency, and broader traffic scenarios.
