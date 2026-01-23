class RankingModel {
    constructor() {
        this.bp = []; // Array of GuildPowerModel
    }
}

class GuildPowerModel {
    constructor(id = 0, name = '', bp = 0) {
        this.id = id;
        this.name = name;
        this.bp = bp;
    }
}

class StandardDataModel {
    constructor() {
        this.status = 0;
        this.timestamp = 0;
        this.data = new DataModel(); // DataModel instance
    }
}

class DataModel {
    constructor() {
        this.world_id = 0;
        this.rankings = new RankingModel(); // RankingModel instance
    }
}

class GrandBattleModel {
    constructor(world_id = 0, id = 0, name = '', bp = 0) {
        this.world_id = world_id;
        this.id = id;
        this.name = name;
        this.bp = bp;
    }
}

// Export if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RankingModel,
        GuildPowerModel,
        StandardDataModel,
        DataModel,
        GrandBattleModel
    };
}
