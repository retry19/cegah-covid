const checkMonth = month => {
    let newMonth = '';
    switch (month) {
        case 1:
            newMonth = 'Januari';
            break;
        case 2:
            newMonth = 'Februari';
            break;
        case 3:
            newMonth = 'Maret';
            break;
        case 4:
            newMonth = 'April';
            break;
        case 5:
            newMonth = 'Mei';
            break;
        case 6:
            newMonth = 'Juni';
            break;
        case 7:
            newMonth = 'Juli';
            break;
        case 8:
            newMonth = 'Agustus';
            break;
        case 9:
            newMonth = 'September';
            break;
        case 10:
            newMonth = 'Oktober';
            break;
        case 11:
            newMonth = 'November';
            break;
        case 12:
            newMonth = 'Desember';
            break;
        default:
            break;
    }

    return newMonth;
}

const filterData = async data => {
    let tgl = [];
    let jml = [];
    const lengthData = data.length;

    await data.map(d => {
        if (d.harike === 1 || d.harike % 5 === 0 || d.harike === lengthData - 1) {
            const newDate = new Date(d.tanggal);
            const date = newDate.getDate();
            const month = checkMonth(newDate.getMonth());
            const year = newDate.getFullYear();
    
            const tanggal = `${date} ${month} ${year}`;
            const jumlahKasusKumulatif = d.jumlahKasusKumulatif;
    
            tgl.push(tanggal);
            jml.push(jumlahKasusKumulatif);
        } else if (d.harike === lengthData && d.jumlahKasusKumulatif !== null) {
            const newDate = new Date(d.tanggal);
            const date = newDate.getDate();
            const month = checkMonth(newDate.getMonth());
            const year = newDate.getFullYear();
    
            const tanggal = `${date} ${month} ${year}`;
            const jumlahKasusKumulatif = d.jumlahKasusKumulatif;
    
            tgl.push(tanggal);
            jml.push(jumlahKasusKumulatif);
        }
    });

    return {tgl, jml};
}

const getDataCovidTgl = async () => {
    let dataCovid = {};
    const url = 'https://indonesia-covid-19.mathdro.id/api/harian';
    await fetch(url)
        .then(res => res.json())
        .then(data => {
            dataCovid = filterData(data.data);
        })
        .catch(err => console.log(err));
    return dataCovid;
}

const renderChart = async () => {
    const {tgl, jml} = await getDataCovidTgl();
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tgl,
            datasets: [{
                label: 'Jumlah kasus di Indonesia',
                data: jml,
                backgroundColor: 'rgba(255, 255, 0, 0.3)',
                borderColor: 'rgba(255, 255, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        fontColor: '#fff',
                        callback: function(value) {
                            const date = value.split(' ')[0];
                            const month = value.split(' ')[1].slice(0, 3);
                            return `${date} ${month}`;
                        }
                    }
                }],
                yAxes: [{
                    gridLines: {
                        color: 'rgba(0,0,0,.2)',
                    },
                    ticks: {
                        fontColor: '#fff',
                    }
                }]
            }
        }
    });

    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;
}

renderChart();