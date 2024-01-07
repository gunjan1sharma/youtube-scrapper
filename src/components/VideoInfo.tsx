import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { VideoInfo } from "../extras/types";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
const defUrl = " https://i.ytimg.com/vi_webp/P-z3aLhp9w4/maxresdefault.webp";

function VideoInfoComponent(props: VideoInfo) {
  const [readMore, setReadMore] = useState(false);
  const descriptionFragment = (
    <React.Fragment>
      <div>
        <Accordion>
          <AccordionSummary
            sx={{ margin: "0px", padding: "0px" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <h3>Video Description</h3>
          </AccordionSummary>
          <AccordionDetails sx={{ width: "60px" }} className="">
            <p>{props.description}</p>
          </AccordionDetails>
        </Accordion>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <div className="border border-gray-400 p-2 md:p-4 shadow-lg max-w-72 md:max-w-full">
        <img className=" md:w-full" alt="" src={props.hqThumbnail.url} />
        <h3 className="font-bold tex-xs line-clamp-2">{props.title}</h3>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="line-clamp-1">
            Channel Name: <strong>{props.channelName}</strong>
          </h3>
          <h3 className="">
            Total Views: <strong>{props.totalView}</strong>
          </h3>
          <h3>
            Video Duration:{" "}
            <strong>{Math.round(props.durationInMinutes)} Mins</strong>
          </h3>
        </div>

        <p className="mt-2 text-xs line-clamp-3 break-words overflow-wrap-anywhere hyphens-auto">
          {props.description}
        </p>

        {!readMore && (
          <h3
            onClick={() => setReadMore(true)}
            className="cursor-pointer text-sm text-blue-900 font-bold"
          >
            Read more
          </h3>
        )}
        {readMore && (
          <p className="text-xs break-words overflow-wrap-anywhere hyphens-auto p-1">
            {props.description}
          </p>
        )}
        {readMore && (
          <h3
            onClick={() => setReadMore(false)}
            className="cursor-pointer text-sm text-blue-900 font-bold"
          >
            Read Less
          </h3>
        )}
      </div>
    </div>
  );
}

export default VideoInfoComponent;
