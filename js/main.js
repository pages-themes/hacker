// Simple JavaScript for the Hacker theme
// Add any interactive features here

let myGuildID = null;

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Get Data button functionality
    const getDataBtn = document.getElementById('getDataBtn');
    const guildSelect = document.getElementById('guildSelect');
    
    if (getDataBtn) {
        getDataBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            
            try {
                getDataBtn.disabled = true;
                
                const grandBattle = new GrandBattle();
                await grandBattle.getData();
                
                populateGuildSelect();
                
                getDataBtn.disabled = false;
                
            } catch (error) {
                console.error('Error loading data:', error);
                getDataBtn.disabled = false;
            }
        });
    }

    function populateGuildSelect() {
        if (!guildSelect || !allGuildData || allGuildData.length === 0) {
            return;
        }

        guildSelect.innerHTML = '<option value="">-- Select a guild --</option>';
        
        const sortedGuilds = [...allGuildData].sort((a, b) => 
            a.name.localeCompare(b.name)
        );
        
        sortedGuilds.forEach(guild => {
            const option = document.createElement('option');
            option.value = guild.id;
            option.textContent = guild.name;
            guildSelect.appendChild(option);
        });
        
        guildSelect.disabled = false;
    }

    function populateResultTable() {
        const tableBody = document.getElementById('resultTableBody');
        if (!tableBody || !allGuildData || allGuildData.length === 0) {
            return;
        }

        if (!myGuildID) {
            tableBody.innerHTML = '';
            return;
        }

        tableBody.innerHTML = '';
        
        const sortedByBP = [...allGuildData].sort((a, b) => b.bp - a.bp);
        const topData = sortedByBP.slice(0, 48);
        
        topData.forEach((guild, index) => {
            const row = document.createElement('tr');
            
            if (guild.id == myGuildID) {
                row.style.backgroundColor = 'rgba(255, 235, 59, 0.3)';
            }
            
            const noCell = document.createElement('td');
            noCell.style.textAlign = 'left';
            noCell.textContent = index + 1;
            
            const worldCell = document.createElement('td');
            worldCell.style.textAlign = 'left';
            const worldNum = guild.world_id.toString().slice(-1);
            worldCell.textContent = 'W' + worldNum;
            
            const nameCell = document.createElement('td');
            nameCell.style.textAlign = 'left';
            nameCell.textContent = guild.name;
            
            const bpCell = document.createElement('td');
            bpCell.style.textAlign = 'left';
            bpCell.textContent = guild.bp.toLocaleString();
            
            row.appendChild(noCell);
            row.appendChild(worldCell);
            row.appendChild(nameCell);
            row.appendChild(bpCell);
            
            tableBody.appendChild(row);
            
            if ((index + 1) % 16 === 0 && index < topData.length - 1) {
                const separatorRow = document.createElement('tr');
                const separatorCell = document.createElement('td');
                separatorCell.colSpan = 4;
                separatorCell.style.textAlign = 'center';
                separatorCell.style.padding = '10px';
                separatorCell.innerHTML = '<hr style="border-color: blue; border-width: 2px;" />';
                separatorRow.appendChild(separatorCell);
                tableBody.appendChild(separatorRow);
            }
        });
    }

    if (guildSelect) {
        guildSelect.addEventListener('change', function() {
            myGuildID = this.value ? parseInt(this.value) : null;
            if (myGuildID) {
                const selectedGuild = allGuildData.find(g => g.id == myGuildID);
                console.log('Selected guild:', selectedGuild);
                console.log('myGuildID:', myGuildID);
            }
            populateResultTable();
        });
    }
});
