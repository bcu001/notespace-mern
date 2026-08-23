export const normalizeDate = (note_createdAt)=>{
    const date = new Date(note_createdAt);
    return `${date.toLocaleString()}`;
}