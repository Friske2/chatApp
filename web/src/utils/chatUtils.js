export function getChatRoomId(userId1, userId2) {
    const sortedIds = [String(userId1), String(userId2)].sort();
    return sortedIds.join('-');
}

export function getUserId() {
    const userJson = sessionStorage.getItem('user')
    const userId = userJson ? JSON.parse(userJson).userId : null
    return userId
}