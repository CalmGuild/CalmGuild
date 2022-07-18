export default (str: string) => /^[a-zA-Z0-9_]{2,16}$/gm.test(str);
