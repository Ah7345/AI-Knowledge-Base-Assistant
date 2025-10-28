#!/bin/bash

echo "=== Document Count ==="
echo ""

# Check via API
echo "Documents in database:"
curl -s http://localhost:8000/documents | python3 -m json.tool

echo ""
echo "=== Quick Summary ==="
DOC_COUNT=$(curl -s http://localhost:8000/documents | python3 -c "import sys, json; data=json.load(sys.stdin); print(len(data.get('documents', [])))")
echo "Total documents: $DOC_COUNT"
