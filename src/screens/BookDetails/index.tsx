import { Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { formatMoney } from '@utils/formatMoney';
import { AppError } from '@utils/AppError';

import { ButtonBack } from '@components/ButtonBack';
import { BookProps } from '@components/BookCard';
import { Button } from '@components/Button';

import { favoritesCreate } from '@storage/favorites/favoritesCreate';
import { favoritesGetAll } from '@storage/favorites/favoritesGetAll';
import { favoritesRemove } from '@storage/favorites/favoritesRemove';

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
  ViewMoreText
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
  const [isFavorited, setIsFavorited] = useState(false);

  const priceFormatted = formatMoney(data.price);

  async function checkBookIsFavorited() {
    const books: BookProps[] = await favoritesGetAll();

    const favoriteAlreadyExists = books.some(
      book => book.id === data.id
    );

    if (favoriteAlreadyExists) {
      return setIsFavorited(true);
    }

    return setIsFavorited(false)
  }

  const publishedDateFormatted = () => {
    if (!data.publishedDate) {
      return;
    }

    return format(new Date(data.publishedDate), "dd/MM/yyyy", {
      locale: ptBR,
    })
  };

  function onTextLayout(e) {
    setShowMore(e.nativeEvent.lines.length > numberOfLines);
  };

  function handleToggle() {
    setNumberOfLines(oldValue => oldValue === 10 ? 0 : 10);
  }

  async function handleFavoriteBook() {
    try{
      if (!isFavorited) {
        await favoritesCreate(data);

        return setIsFavorited(true);
      }

      await favoritesRemove(data.id);

      return setIsFavorited(false);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops...', error.message)
      } else {
        Alert.alert(
          'Ops...',
          !isFavorited
            ? 'Não foi possível favoritar esse livro.'
            : 'Não foi possível remover esse livro dos favoritos.'
        );

        console.log(error);
      }
    }
  };

  const typeTextToggleDescription = 
    numberOfLines === 0 ? 'Ver menos' : 'Ver mais';

  const typeIconToggleDescription = 
    numberOfLines === 0 ? 'chevron-up' : 'chevron-down';

  useEffect(() => {
    checkBookIsFavorited();
  }, [])
  
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
          onPress={handleFavoriteBook}
          title={!isFavorited ? 'Adicionar aos favoritos' : 'Remover dos favoritos'}
          type={!isFavorited ? 'add' : 'remove'}
        />
      </Content>
    </Container>
  )
}