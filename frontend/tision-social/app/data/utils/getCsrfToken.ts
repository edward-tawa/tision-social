function getCsrfToken(): string | null {
    const match = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
    return match ? decodeURIComponent(match[2]) : null;
}

export default getCsrfToken;