# Generated by Django 3.2.2 on 2021-05-07 20:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('decks', '0001_initial'),
        ('flashcards', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flashcard',
            name='deck',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='flashcards', to='decks.deck'),
        ),
    ]
