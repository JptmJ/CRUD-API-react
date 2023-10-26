function Url() {
    const ip = "54.172.161.209";
    const getUrl = `http://${ip}:3010/getGoals`;
    const deleteUrl = `http://${ip}:3010/deleteGoal`;
    const postUrl = `http://${ip}:3010/addGoal`;
    const putUrl = `http://${ip}:3010/updateGoal`;
    return {
        getUrl,
        deleteUrl,
        postUrl,
        putUrl,
    };
}

export default Url;
