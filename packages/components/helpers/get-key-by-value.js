const GetKeyByValue = (list, value, key) => {
	return list.find((element) => element[key] === value);
};
export default GetKeyByValue;
