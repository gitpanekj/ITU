export function loadUserContext() : number | null 
{
    let userId = localStorage.getItem("userId");
    if (!userId) return null;
    return +userId;
}

export function setUserContext(userId: number) : void
{
    localStorage.setItem("userId", String(userId));
}