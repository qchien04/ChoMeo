import { useState } from "react";
import { PageProps } from "@/types";
import CardItem from "@/Components/CardItem";
import CACard from "@/Components/CACard";
import HomeLayout from "@/Layouts/HomeLayout";
import { Pagination } from "antd";
import "./Search.css"
type SearchResult = {
  data: any;
  type: string;
  relevance: number;
};

type SearchProps = {
  results: SearchResult[];
  searchKey: string;
};

export default function Search({ results, searchKey }: PageProps<SearchProps>) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = results.slice(startIndex, startIndex + itemsPerPage);

  return (
    <HomeLayout>
      <div className="search-container">
        <h2>
          Kết quả tìm kiếm cho: <span style={{ color: "red" }}>{searchKey}</span>
        </h2>

        {currentResults.length > 0 ? (
          <div className="search-results">
            {currentResults.map((item, index) => (
              <div key={index} className="search-item">
                {item?.data?.id && (
                  <>
                    {item.type === "cat" && <CardItem category="meo" item={item.data} />}
                    {item.type === "dog" && <CardItem category="cho" item={item.data} />}
                    {item.type === "cage" && <CACard typeItem="long" item={item.data} />}
                    {item.type === "accessory" && <CACard typeItem="phu-kien" item={item.data} />}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Không tìm thấy kết quả nào</p>
        )}

        {/* Pagination */}
        {results.length > itemsPerPage && (
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={results.length}
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn mượt lên đầu trang
            }}
            style={{ marginTop: "20px", textAlign: "center" }}
          />
        )}
      </div>
    </HomeLayout>
  );
}
