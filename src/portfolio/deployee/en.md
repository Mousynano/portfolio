## Why the framework existed

The deployment problem at PT Sakura System Solutions was not simply “how do we run containers.” Different customer environments could have different configuration, network access, and operational constraints. A manual package-and-deploy workflow becomes fragile when the person deploying must repeatedly coordinate files, ports, environment-specific values, and recovery steps across separate targets.

Deployee started as a proof of concept for making that workflow more consistent without pretending every customer environment is identical.

## The architecture I chose

I designed the system around a **server-agent** model. The central server manages deployment intent and visibility, while an agent runs inside each target environment and performs the local deployment work.

The important constraint was connectivity. Instead of requiring every target environment to expose a new inbound management port, the agent can initiate communication outward to the server. That makes the deployment model easier to fit into environments where inbound access is restricted or operationally expensive to coordinate.

The framework evolved through multiple internal iterations and reached **v1.9.0** during the internship.

## What I implemented

My role on the PoC has been closer to a small product owner plus implementer than a narrow ticket executor. I have been responsible for the technical decisions and implementation around:

- server-agent deployment flow and target state;
- deployment plans, current state, and deployment history;
- configuration, secrets, volumes, networks, and container lifecycle operations;
- runtime exposure choices for local-only, host-bound, and all-interface access;
- reverse-proxy and Cloudflare Tunnel setup paths;
- container logs and resource visibility;
- rollback and Last Known Good recovery behavior;
- blue-green deployment concepts for reducing recovery risk;
- production-pilot deployment and office DNS integration.

## Operational thinking behind it

The framework is deliberately shaped around day-two operations. A deployment interface is not very useful if the operator can launch a container but cannot tell what is running, inspect logs, understand an exposure failure, or recover when a release causes trouble.

That is why the progression of the project moved from “send a deployment” toward a more explicit state model: what is planned, what is current, what happened previously, what the target reports, and what recovery path is available.

## Boundaries

Deployee is an internal company project and is still a pilot, not a public commercial platform. I describe the engineering patterns and my contribution without publishing client data, credentials, proprietary deployment details, or claiming rollout scale that has not been validated.

The strongest portfolio value is therefore the systems problem itself: turning heterogeneous deployment constraints into a workflow that is more visible, repeatable, and recoverable.
