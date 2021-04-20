import React, { useContext, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import Tag from "./Tag";
import { Link } from "react-router-dom";

const TagList = () => {
  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <section>
      <Link to="/tag/add" className="nav-link">
        New Tag
      </Link>
      {tags.map((t) => (
        <Tag key={t.id} tag={t} />
      ))}
    </section>
  );
};

export default TagList;
