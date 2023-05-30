export function createConversationName(sender, receiver) {
    const namesAlph = [sender, receiver].sort();
    return `${namesAlph[0]}__${namesAlph[1]}`;
}

export function extractReceiver(conv_name, sender) {
    const names = conv_name.split("__");
    const filteredNames = names.filter(name => {
        return name !== sender;
      });
    return filteredNames[0];
}