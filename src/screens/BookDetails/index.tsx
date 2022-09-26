import { useState, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { ButtonBack } from '@components/ButtonBack';
import { BookProps } from '@components/BookCard';

import { formatMoney } from '@utils/formatMoney';

import { favoritesCreate } from '@storage/favorites/favoritesCreate';

import {
  Container,
  Header,
  HeaderContent,
  Title,
  Content,
  MainInfosBook,
  Image,
  WrapperInfosBook,
  BookTitle,
  Author,
  Publisher,
  Price,
  Description,
  DescriptionTitle,
  Line,
  DescriptionText,
  ViewMore,
  ViewMoreText,
  Button
} from './styles';

export interface BookDetailsProps {
  data: BookProps;
}

export function BookDetails() {
  const { COLORS } = useTheme();
  const route = useRoute();
  const { data } = route.params as BookDetailsProps;

  const [showMore, setShowMore] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(10);

  const onTextLayout = (e) => {
    setShowMore(e.nativeEvent.lines.length > numberOfLines);
  };

  const publishedDateFormatted = () => {
    if (!data.publishedDate) {
      return;
    }

    return format(new Date(data.publishedDate), "dd/MM/yyyy", {
      locale: ptBR,
    })
  };

  function handleToggle() {
    setNumberOfLines(oldValue => oldValue === 10 ? 0 : 10);
  }

  async function handleNewFavorite() {
    try{
      await favoritesCreate(data);
    } catch (error) {
      console.log(error);
    }
  };

  const typeTextToggleDescription = 
    numberOfLines === 0 ? 'Ver menos' : 'Ver mais';

  const typeIconToggleDescription = 
    numberOfLines === 0 ? 'chevron-up' : 'chevron-down';


  const priceFormatted = formatMoney(data.price);
  
  return (
    <Container>
      <Header>
        <HeaderContent>
          <ButtonBack />

          <Title>Detalhes</Title>
        </HeaderContent>
      </Header>

      <Content>
        <MainInfosBook>
          <Image source={{ uri: data.photo_url }} />

          <WrapperInfosBook>
            <BookTitle>{data.name}</BookTitle>

            <Author>{data.author ? data.author : 'Autor desconhecido'}</Author>

            <Publisher>
              {data.publisher ? `${data.publisher}` : 'Editora não encontrada'}
            </Publisher>

            <Price>{priceFormatted}</Price>
          </WrapperInfosBook>
        </MainInfosBook>

        <Description>
          <DescriptionTitle>Descrição</DescriptionTitle>

          <Line />

          <DescriptionText
            ellipsizeMode='tail'
            numberOfLines={numberOfLines}
            onTextLayout={onTextLayout}
          >
            {data.description ? data.description : 'Sem descrição'}
          </DescriptionText>

          
          {showMore && (
            <ViewMore onPress={handleToggle}>
              <ViewMoreText>{typeTextToggleDescription}</ViewMoreText>

              <MaterialCommunityIcons
                name={typeIconToggleDescription}
                size={18}
                color={COLORS.LINK}
              />
            </ViewMore>
          )}
        </Description>

        <Button
          onPress={handleNewFavorite}
          title='Adicionar aos favoritos'
        />
      </Content>
    </Container>
  )
}