export function getChatRoomId(userId1, userId2) {
    const sortedIds = [String(userId1), String(userId2)].sort();
    return sortedIds.join('-');
}

export function getUserId() {
    const userId = sessionStorage.getItem('userId')
    return userId
}