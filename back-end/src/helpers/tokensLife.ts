const date = new Date().getTime();

export const dateRefresh = new Date(date + 1000 * 60 * 60 * 24 * 7);
export const dateAccess = new Date(date + 1000 * 60 * 120);

// mail token life 5 minutes
export const verificationTokenLifeTimeMin = 5;
export const isMailTokenAlive = (existTokenCreatedAt:string) => (date - Date.parse(existTokenCreatedAt)) / 1000 / 60 <= verificationTokenLifeTimeMin;
