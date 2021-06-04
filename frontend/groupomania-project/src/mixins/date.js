export const setDate = {
    methods:{
        setDate(date) {
            const publicationDate = new Date(`${date}`);
            const publicationDay = publicationDate.getDate();
            const publicationMonth = publicationDate.getMonth();
            const publicationYear = publicationDate.getFullYear();
            const publicationHours = publicationDate.getHours();
            let publicationMinutes = publicationDate.getMinutes();
            
            let tab_month= ["Janvier","Février","Mars","Avril","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
            if(publicationMinutes < 10){
                publicationMinutes = `0`+publicationMinutes
            }
            let configDate = publicationDay+' '+tab_month[publicationMonth+2]+' '+ publicationYear
            // ${publicationDay} ${tab_month[publicationMonth+2]} ${publicationYear}
            return `Le ${configDate}, à ${publicationHours}h${publicationMinutes}`
        }
    }
}