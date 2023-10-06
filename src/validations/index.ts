export const isRequired = (data: Record<any, any>, requiredFields: string[]) => {
    for (const field of requiredFields) {
        if (data[field] === null || data[field] === undefined || data[field] === ' ' || data[field] === '' || data[field] < 0) {
            return field
        }
    }
}

export const isEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email)
}