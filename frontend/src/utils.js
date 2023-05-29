export function createConversationName(sender, receiver) {
    const namesAlph = [sender, receiver].sort();
    return `${namesAlph[0]}__${namesAlph[1]}`;
}