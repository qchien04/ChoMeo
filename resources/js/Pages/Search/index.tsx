
import { PageProps } from "@/types";
import CardItem from "@/Components/CardItem";
import { Cat } from "../Test1";
import { Dog } from "../DogCategory";
import { Cage } from "../CageCategory";
import { Accessory } from "../AccessoryCategory";
import CACard from "@/Components/CACard";
import HomeLayout from "@/Layouts/HomeLayout";

type SearchResultsProps ={
  cats:Cat[];
  dogs: Dog[];
  cages: Cage[];
  accessories: Accessory[];
}

export default function Search({ cats, dogs, cages, accessories }: PageProps<SearchResultsProps>) {
  console.log(cats);
  console.log(dogs);
  console.log(cages);
  console.log(accessories);
  return (
    <HomeLayout> 
      <div className="search-container">

      <h3>Mèo</h3>
      <div className="search-results">
        {cats.length > 0 ? cats.map((cat) => <CardItem key={cat.id} category="meo" item={cat} />) : <p>Không tìm thấy mèo nào</p>}
      </div>

      <h3>Chó</h3>
      <div className="search-results">
        {dogs.length > 0 ? dogs.map((dog) => <CardItem key={dog.id} category="cho" item={dog} />) : <p>Không tìm thấy chó nào</p>}
      </div>

      <h3>Lồng</h3>
      <div className="search-results">
        {cages.length > 0 ? cages.map((cage) => <CACard key={cage.id} typeItem="long" item={cage} />) : <p>Không tìm thấy lồng nào</p>}
      </div>

      <h3>Phụ kiện</h3>
      <div className="search-results">
        {accessories.length > 0 ? accessories.map((acc) => <CACard key={acc.id} typeItem="phu-kien3ws" item={acc} />) : <p>Không tìm thấy phụ kiện nào</p>}
      </div>
    </div>
    </HomeLayout>
    
  );
}
