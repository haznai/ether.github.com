import * as Dialog from '../components/StyledModal.tsx';
import {GHRelease, useUIStore} from "../store/store.ts";
import {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faLink} from "@fortawesome/free-solid-svg-icons";
import {downloadFile} from "../utils/utils.ts";
export const SelectVersionModal = ()=>{
    const selectedVersionWindow = useUIStore(state => state.selectVersionWindow)
    const setSelectVersionWindow = useUIStore(state => state.setSelectVersionWindow)
    const releases = useUIStore(state => state.releases)
    const setReleases = useUIStore(state => state.setReleases)

    useEffect(() => {
        if(selectedVersionWindow && releases.length === 0){
            fetch('https://api.github.com/repos/ether/etherpad-lite/releases')
                .then(response => response.json())
                .then(data => {
                    setReleases(data)
                });
        }
    }, [selectedVersionWindow])

    const formatDate = (date:string)=>{
        return new Date(date).toLocaleDateString(window.navigator.language, { // you can use undefined as first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        })
    }



    const openDoc = (version:string)=>{
        if(version.startsWith('v')){
            version = version.substring(1)
        }
        window.open(`/doc/v${version}/index.html`)
    }

    return <Dialog.Dialog open={selectedVersionWindow} onOpenChange={()=>setSelectVersionWindow(!selectedVersionWindow)}>
        <Dialog.DialogContent className="bg-white dark:bg-gray-700 dark:text-white overflow-auto max-h-96 max-w-7xl">
            <h2>Past versions of etherpad</h2>
            <p>Here you can find past versions of etherpad. We recommend you to use the latest version of etherpad.</p>
            <table>
                <thead className="border-b-[1px] pb-5">
                    <tr>
                        <th>Version</th>
                        <th>Release date</th>
                        <th>Download</th>
                        <th>Author</th>
                        <th>Docs</th>
                    </tr>
                </thead>
                <tbody>
                {
                    releases.map((release:GHRelease)=>{
                        return <tr className="">
                            <td className="text-center pt-2">{release.tag_name}</td>
                            <td className="text-center pt-2">{formatDate(release.published_at)}</td>
                            <td className="flex gap-3 flex-wrap pt-2">{release.assets.map(a=><div className="bg-secondary dark:bg-secondary-dark rounded-2xl pl-5 p-1 flex gap-2">{a.name}
                                <FontAwesomeIcon className="mr-5 cursor-pointer self-center" icon={faDownload} title={a.name} onClick={()=>downloadFile(a.browser_download_url)}/></div>)}</td>
                            <td className="pt-2"><img alt="Logos of release" className="h-10 rounded-full" title={release.author.login} src={release.author.avatar_url}/></td>
                            <th><FontAwesomeIcon icon={faLink} className="cursor-pointer" onClick={()=>openDoc(release.tag_name)}/></th>
                        </tr>
                    })
                }
                </tbody>
            </table>
    </Dialog.DialogContent>
    </Dialog.Dialog>
}
