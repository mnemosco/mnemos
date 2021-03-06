import pytest
import json

from .factories import FlashCardFactory, DeckFactory


@pytest.mark.django_db
def test_empty_decks(client_query):
    response = client_query(
        '''
        query{
            allDecks{
                id,
                name
            }
        }
        '''
    )
    assert {'data': {'allDecks': []}} == json.loads(response.content)


@pytest.mark.django_db
def test_all_flashcards(client_query, django_assert_num_queries):
    decks = DeckFactory.create_batch(15)
    for deck in decks:
        FlashCardFactory.create_batch(15, deck=deck)
    with django_assert_num_queries(2):
        response = client_query(
            '''
            query{
                allDecks{
                    id,
                    name
                    flashcards{
                        id,
                        prompt,
                        answer
                    }
                }
            }
            '''
        )

    expected_response = {
        'data': {
            'allDecks': [
                {
                    'id': str(deck.id),
                    'name': deck.name,
                    'flashcards': [
                        {
                            'id': str(flashcard.id),
                            'prompt': flashcard.prompt,
                            'answer': flashcard.answer
                        }
                        for flashcard in deck.flashcards.all()
                    ]
                }
                for deck in decks
            ]
        }
    }
    assert expected_response == json.loads(response.content)
