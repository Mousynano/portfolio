## The operational constraint

Not every attendance deployment can assume a reliable cloud connection or a continuously running backend. This prototype explores a smaller operational unit: one ESP32 controller that can authenticate people, store records, manage credentials, control a relay, and expose administration locally.

The device has been physically installed for research and development at STEKOM Semarang and Universitas Negeri Semarang. It is not presented as a production user deployment; the LCD and LVGL interface remain at prototype stage.

## How the device works

A user presents a fingerprint or NFC credential. The controller validates the credential locally, determines whether the event is a check-in or check-out, records the action, updates connected local interfaces, and controls the relay when required.

The administrative interface allows authorized operators to manage users and credentials, inspect presence records, configure device behavior, and export local data. WebSocket updates keep local browser clients synchronized without requiring a remote service.

## What I built

My work centered on the standalone firmware and local operational flow:

- ESP32 firmware structure and hardware abstraction;
- fingerprint and NFC credential processing;
- local user and credential management;
- presence logging and automatic check-out behavior;
- relay and device-control workflow;
- local web administration and WebSocket updates;
- licensing and device identity checks;
- prototype LVGL integration for the embedded display.

## Why local-first

Local-first operation keeps the core attendance workflow available when internet access is unavailable. It also reduces the number of external services required for a small installation. The trade-off is that synchronization, backup, device fleet management, and remote observability require additional design before this can become a larger production product.

## Current status

The controller is an installed R&D prototype. Core firmware and local web workflows exist, while the LCD interface and broader field validation still need refinement. The project is valuable as an integration study: it combines hardware events, local state, web administration, security constraints, and real-world installation concerns in one constrained device.
