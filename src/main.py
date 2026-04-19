import json

from fastapi import FastAPI, HTTPException, Request

from src.config import settings
from src.handlers.issues import handle_issue
from src.handlers.pull_request import handle_pull_request
from src.handlers.release import handle_release
from src.handlers.repository import handle_repository
from src.handlers.workflow import handle_workflow
from src.utils.verify import verify_signature

app = FastAPI(docs_url=None, redoc_url=None)

HANDLERS = {
    "issues": handle_issue,
    "pull_request": handle_pull_request,
    "workflow_run": handle_workflow,
    "release": handle_release,
    "repository": handle_repository,
}


@app.post("/")
async def webhook(request: Request) -> dict[str, str]:
    body = await request.body()
    signature = request.headers.get("x-hub-signature-256")
    event = request.headers.get("x-github-event")

    if not verify_signature(body, signature, settings.github_webhook_secret):
        raise HTTPException(status_code=401, detail="Unauthorized")

    handler = HANDLERS.get(event or "")
    if handler:
        try:
            await handler(json.loads(body))
        except Exception as e:
            print(f"[{event}] handler error: {e}")

    return {"ok": "true"}
