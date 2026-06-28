# reward-flights — MDX docs (Rspress)
# Port block (base = 9000 + crc32("reward-flights") % 900):
#   docs = 9307
DOCS_PORT := "9307"
# Bind address: 0.0.0.0 = reachable from any IP / other machines on the network.
# Override for localhost-only with: just DOCS_HOST=127.0.0.1 docs
DOCS_HOST := "0.0.0.0"

# List available recipes
default:
    @just --list

# Preflight: fail loudly if the docs port is already held
_check-port:
    #!/usr/bin/env bash
    set -euo pipefail
    if lsof -iTCP:{{DOCS_PORT}} -sTCP:LISTEN -t >/dev/null 2>&1; then
        pid=$(lsof -iTCP:{{DOCS_PORT}} -sTCP:LISTEN -t | head -1)
        echo "Port {{DOCS_PORT}} already in use by pid ${pid}:"
        ps -p "${pid}" -o pid,command || true
        exit 1
    fi

# Run the docs dev server (live reload + working search) on the registered port
docs: _check-port
    npx rspress dev --port {{DOCS_PORT}} --host {{DOCS_HOST}}

# Build the static docs site into doc_build/
build:
    npx rspress build

# Preview the built static site on the registered port
preview: build
    npx rspress preview --port {{DOCS_PORT}} --host {{DOCS_HOST}}
