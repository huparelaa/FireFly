import { SearchPeople } from "./SearchPeople"
import { UserInfo } from "./UserInfo"

function Header(){
    return (
        <div className="flex w-full h-2/5 items-center py-5" > 
            <SearchPeople/>
            <UserInfo />
        </div>
    )
}

export { Header }