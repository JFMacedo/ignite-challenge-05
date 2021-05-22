import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date: string) {
  const formatteddate = format(
    new Date(date),
    "dd MMM yyyy",
    {
      locale: ptBR,
    }
  );

  return formatteddate;
};