import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  border-radius: 12px;
  gap: 32px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);

  & > img {
    width: 130px;
  }
`;

const Title = styled.h2`
  font-size: 1em;
  color: #333;
  margin: 0;
  text-align: left;
`;

const Description = styled.p`
  font-size: 0.8em;
  text-align: left;
  margin: 12px 0 0;
`;

type Props = {
    srcUrl: string;
    title: string;
    description: string;
}

export default function Thumbnail2({ srcUrl, title, description }: Props) {
    return (
      <Wrapper>
        <img src={srcUrl}></img>
        <div>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
      </Wrapper>
    );
}