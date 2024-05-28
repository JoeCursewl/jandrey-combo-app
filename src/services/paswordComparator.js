const passwordComparator = (CompPassword, password) => {
    if (CompPassword === password) return true

    if (CompPassword !== password) return false
}

export default passwordComparator