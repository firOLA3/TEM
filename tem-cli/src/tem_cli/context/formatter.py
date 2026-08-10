from ..models import ErrorPayload

def format_markdown(payload: ErrorPayload) -> str:
    """
    Combines the raw error and the context snippet into a Markdown string.
    """
    md = []
    md.append("I encountered the following error:")
    md.append("```")
    md.append(payload.raw_text.strip())
    md.append("```")
    
    if payload.context_snippet:
        md.append(f"\nHere is the source context from `{payload.file_path}` around line {payload.line_number}:")
        md.append("```")
        md.append(payload.context_snippet)
        md.append("```")
        
    return "\n".join(md)
