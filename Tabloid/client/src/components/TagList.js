import React, { useContext, useEffect } from "react";
import { TagContext } from "../providers/TagProvider";
import Tag from "./Tag";

const TagList = () => {
  const { tags, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <section>
      {tags.map((t) => (
        <Tag key={t.id} tag={t} />
      ))}
    </section>
  );
};

export default TagList;
