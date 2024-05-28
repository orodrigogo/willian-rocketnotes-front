import { useState } from 'react';
import { Header } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/TextArea';
import { NoteItem } from '../../components/NoteItem';
import { Section } from '../../components/Section';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

import { api } from '../../services/api';
import { Container, Form } from './styles'

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink(){
    setLinks(preveState => [...preveState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => preveState.filter(link => link !== deleted))

  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted ))
  }

  async function handleNowNote(){
    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });
    alert("Nota criada com Sucesso!");
    navigate(-1)
  }

  return (
    <Container>
      <Header /> 

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input 
            placeholder="Título" 
            onChange = {e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Observações"
            onChange = {e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem 
                key= {String(index)} 
                value={link} 
                onClick={() => handleRemoveLink(link)}
                />
            ))}
            <NoteItem 
              isnew 
              placeholder="Novo Link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)} 
              onClick={handleAddLink} />
          </Section>

          <Section title="Marcadores">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))  
              }
              <NoteItem 
                isnew 
                placeholder="Nova tag"
                onChange={e => setNewTag(e.target.value)} 
                value={newTag}
                onClick={handleAddTag} 
              />
            </div>
          </Section>
          <Button 
            title="Salvar"
            onClick={handleNowNote}
          />
        </Form>
      </main>
    </Container>
  )
}