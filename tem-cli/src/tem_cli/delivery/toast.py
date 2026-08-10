from windows_toasts import WindowsToaster, Toast

def show_toast(title: str, message: str):
    """
    Shows a Windows toast notification.
    """
    toaster = WindowsToaster("TEM")
    toast = Toast()
    toast.text_fields = [title, message]
    toaster.show_toast(toast)
