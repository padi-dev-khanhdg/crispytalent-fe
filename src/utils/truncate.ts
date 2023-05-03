export const truncate=(text:string | null,num:number=10)=>{
   if(text!==undefined && text!== null){
    if(text.length>num){
        return text.slice(0,num)+"..."
    }
   }
    return text
}