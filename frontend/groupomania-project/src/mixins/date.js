export const setDate = {
    methods:{
        setDate(date) {
            const publicationDate = new Date(`${date}`);
            const publicationDay = publicationDate.getDate();
            const publicationMonth = publicationDate.getMonth();
            const publicationYear = publicationDate.getFullYear();
            const publicationHours = publicationDate.getHours();
            const publicationMinutes = publicationDate.getMinutes();
            
            let tab_month= ["Janvier","Février","Mars","Avril","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
            return `Le ${publicationDay} ${tab_month[publicationMonth+2]} ${publicationYear}, à ${publicationHours}h${publicationMinutes}`
        }
    }
}