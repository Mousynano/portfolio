## Why the system existed

FACETRO supports face-recognition attendance, reporting, and door-access workflows at Universitas Negeri Semarang. During my internship, it was used across FIPP, the Faculty of Engineering, and the Digital Center for the PRIGEL program. The challenge was not merely to return a recognition result. The surrounding platform also had to manage profiles, attendance logs, device activity, protected images, reports, notifications, and deployment across cloud and edge infrastructure.

The original backend grouped too many responsibilities into one deployment. File handling and Telegram operations lived beside the core API, making maintenance and infrastructure changes harder than necessary.

## What I was responsible for

As a Backend Engineer Intern from September 2024 to July 2025, I worked on the platform across two internship phases. My contribution covered:

- separating the core backend, Telegram integration, object storage, and ML inference responsibilities;
- developing REST APIs for presence, door lock, profiles, device and user logs, activity data, and administrative operations;
- integrating Google SSO and protected file access;
- moving file storage to MinIO with versioning;
- implementing quick and full attendance recap workflows;
- supporting deployment automation, Portainer-based operations, and the migration from GCP to Huawei Atlas edge hardware;
- validating the Dlib and FaceNet recognition pipeline reported in the internship study.

## How the deployed system evolved

The internship report documents the backend and ML workloads being separated into multiple services. Requests were routed through a load-balancing layer, while storage, database, backend, and ML responsibilities were separated. The deployed design also included automated container updates and master-slave ML processing.

![FACETRO deployed architecture from the internship report](/assets/images/projects/facetro/deployed-architecture.webp "Architecture documented in the second internship report. This is the deployed report-era system, not the later HAProxy and Tailscale design exploration.")

I deliberately do not present the newer HAProxy, Tailscale, and workload-cluster design as a deployed result. That work belongs to a later architecture exploration and is not the basis of this case study.

## Operational workflows delivered

The platform work was broader than recognition inference. It included secure login, attendance recap, activity reporting, profile and image handling, role-aware Telegram broadcasts, and operational container management.

![FACETRO login interface documented in the report](/assets/images/projects/facetro/login.webp "Google SSO was added alongside the existing login workflow.")

![Portainer operations documented in the report](/assets/images/projects/facetro/portainer.webp "Portainer provided a clearer operational view of deployed containers and resource usage.")

## What changed

The backend responsibilities became more modular, object storage was separated from the application server, and operational workflows such as SSO, recap generation, protected files, and container management became part of the deployed platform. The migration work also moved backend and ML services from a GCP-based environment toward Huawei Atlas edge infrastructure.

The report records an average total processing time of 407.21 ms across backend and ML stages during phase testing. I do not claim user-growth or deployment-time improvements because those metrics were not collected during the engagement.

## Constraints and lessons

The strongest lesson was that a production ML product is mostly a systems problem around the model: identity, storage, API contracts, deployment, reporting, authorization, and recovery paths all matter. The internship also showed why operational measurements should be defined before optimization begins. We improved the system, but several useful before-and-after metrics simply did not exist.
