// Global variable to store all guild data
let allGuildData = [];

class GrandBattle {
    constructor() {
        this.webClient = new WebClient();
        this.timestamp = 0;
    }

    getWorldList(includeW10) {
        const server = "5";
        const wList = [];
        const worldCount = includeW10 ? 10 : 9;

        for (let i = 1; i <= worldCount; i++) {
            wList.push(server + i.toString().padStart(3, '0'));
        }

        return wList;
    }

    async getData() {
        const wList = this.getWorldList(true);
        allGuildData = []; // Clear previous data

        try {
            for (const world of wList) {
                const model = await this.callAPIGetData(world);
                this.changeModelToList(model);
            }
        } catch (ex) {
            console.error('Error getting data:', ex);
        }
    }

    async callAPIGetData(world) {
        const apiUrl = `https://api.mentemori.icu/${world}/guild_ranking/latest`;
        return await this.webClient.getAsync(apiUrl);
    }

    changeModelToList(model) {
        if (!model || !model.data || !model.data.rankings || !model.data.rankings.bp) {
            return;
        }

        const listOfBP = model.data.rankings.bp;
        const worldID = model.data.world_id;
        this.timestamp = model.timestamp;

        for (const item of listOfBP) {
            const existingItem = allGuildData.find(g => g.id === item.id);
            
            if (!existingItem) {
                const grandBattleItem = {
                    world_id: worldID,
                    id: item.id,
                    name: item.name,
                    bp: item.bp
                };
                allGuildData.push(grandBattleItem);
            }
        }
    }
}

// Export if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GrandBattle, allGuildData };
}
