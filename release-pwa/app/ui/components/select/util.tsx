const escapedRegExp: Function = (str: string) => {
    return new RegExp(str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
}

export {
    escapedRegExp
}