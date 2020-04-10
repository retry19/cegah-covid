// untuk mengambil data covid19 dengan menggunakan api dari github.com/mathdroid
const getDataCovid = () => {
    let c_positif = document.getElementById('info__section-positif');
    let c_sembuh = document.getElementById('info__section-sembuh');
    let c_meninggal = document.getElementById('info__section-meninggal');
    let c_dirawat = document.getElementById('info__section-dirawat');

    fetch('https://indonesia-covid-19-api.now.sh/api')
        .then(res => {
            if (res.ok)
                return res.json();
        })
        .then(data => {
            c_positif.insertAdjacentHTML('beforeend', `<h1>${data.jumlahKasus}</h1>`);
            c_sembuh.insertAdjacentHTML('beforeend', `<h1>${data.sembuh}</h1>`);
            c_meninggal.insertAdjacentHTML('beforeend', `<h1>${data.meninggal}</h1>`);
            c_dirawat.insertAdjacentHTML('beforeend', `<h1>${data.perawatan}</h1>`);
        })
        .catch(err => console.log(err));
};

// untuk mengambil data waktu update covid19 dengan menggunakan api dari github.com/mathdroid
const getDateUpdate = () => {
    let infoDate = document.getElementById('info__date');
    fetch('https://indonesia-covid-19.mathdro.id/api/harian')
        .then(res => {
            if (res.ok)
                return res.json();
        })
        .then(data => {
            const result = data.data.slice(-1)[0]
            const date = new Date(result.tanggal).toDateString(); 
            infoDate.insertAdjacentHTML('afterbegin', `Update : ${date}`);
        })
        .catch(err => console.log(err));
};

// untuk mengambil data berita di indonesia dengan kategory kesehatan dari api newsapi.org
const getDataArticle = () => {
    let artikelWrapper = document.getElementById('artikel__wrapper');
    fetch('http://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=0b51ec61d73540db8183c658207f3891')
        .then(res => {
            if (res.ok)
                return res.json();
        })
        .then(data => {
            const articles = data.articles;
            const html = articles.map((article, index) => {
                if (index < 5) {
                    const articleDate = new Date(article.publishedAt).toDateString();
                    return `
                        <article class="artikel__section">
                            <label>${articleDate}</label>
                            <h4><a href="${article.url}" target="_blank">${article.title}</a></h4>
                            <p>${article.description}</p>
                        </article>
                    `;
                }
            }).join('');
            artikelWrapper.insertAdjacentHTML('afterbegin', html);
        })
        .catch(err => console.log(err));
};

getDataCovid();
getDateUpdate();
getDataArticle();