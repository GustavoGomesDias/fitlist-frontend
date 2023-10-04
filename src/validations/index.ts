export const isRequired = (data: Record<any, any>, requiredFields: string[]) => {
    for (const field of requiredFields) {
        if (data[field] === null || data[field] === undefined || data[field] === ' ' || data[field] === '' || data[field] < 0) {
            return field
        }
    }
}