import { Search } from '@components/Search';
import { BookCard } from '@components/BookCard';

import {
  Container,
  Header,
  Greeting,
  GreetingText,
  MenuHeader,
  Title,
} from './styles';

export function Home() {
  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingText>Olá, Kássio</GreetingText>
        </Greeting>
      </Header>

      <Search onSearch={() => {}} onClear={() => {}} />

      <MenuHeader>
        <Title>Livros</Title>
      </MenuHeader>

      <BookCard
        data={{
          id: '1',
          name: 'Aviva a tua obra',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
          photo_url: 'https://github.com/kassiosilva.png'
        }}
      />

      <BookCard
        data={{
          id: '2',
          name: 'O Peregrino',
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
          photo_url: 'https://github.com/kassiosilva.png'
        }}
      />
    </Container>
  );
}
