export function isValidId(slug: string)
{
    return /^\d+$/.test(slug);
}