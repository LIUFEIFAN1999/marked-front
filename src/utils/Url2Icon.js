export default function Url2Icon(url){
    let domain = new URL(url)
    return domain.protocol + "//"+domain.hostname+"/favicon.ico"
}