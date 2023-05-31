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

export function calculateTimeAgo(timestamp) {
    const messageDate = new Date(timestamp);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - messageDate.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    

    if (diffInMinutes > 1440) {
        return `${Math.floor(diffInMinutes / (60*24))} day(s) ago`;
    }
    if (diffInMinutes > 60) {
        return `${Math.floor(diffInMinutes / 60)} hour(s) ago`;
    }
    return `${diffInMinutes} min(s) ago`;
}