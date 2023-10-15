import Image from "next/image";
import styled from "styled-components";
import Flex from "../Layout/Flex";


import useUser from "@/hooks/useUser";

import Link from "next/link";
import { deleteListing } from "@/lib/api";
import useSWR from "swr";
import { StyledLink } from "../Layout/StyledLink";
import { StyledButton } from "../Layout/StyledButton";

const StyledImageWrapper = styled.div`
  height: 135px;
  width: 135px;
  border-radius: 11px;
  overflow: hidden;
  position: relative;
`;
const StyledStarshipImage = styled(Image)`
  object-fit: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const StyledParagraph = styled.p`
  color: var(--secondary-color);
`;

export default function ListingCard({ _id, name, img, price }) {

  const {data: listings, mutate } = useSWR("/api/listings");


  async function onDelete(id) {
    if (!confirm("Are you sure you want to delete this starship?")) {
      return;
    }
    await deleteListing(id);
    mutate();
  }

  return (

    <Flex
      height="150px"
      width="90%"
      direction="column"
      alignItems="center"
      padding="1rem"
      gap=".5rem"
    >


    
      <StyledImageWrapper className={mainTheme}>

        <StyledStarshipImage
          src={img}
          alt={name}
          height={0}
          width={0}
          layout="responsive"
        />
      </StyledImageWrapper>
      <Flex direction="column" alignItems="center">
        <StyledParagraph>{name}</StyledParagraph>
        <StyledParagraph>Price: {price}</StyledParagraph>

        <Flex direction="row" gap="1rem">
          <StyledLink href={`/my-profile/my-selling-list/edit-offer/${_id}`}>
            Edit
          </StyledLink>
          <StyledButton type="button" onClick={() => onDelete(_id)}>
            Delete
          </StyledButton>
        </Flex>


    

      </Flex>
    </Flex>
  );
}
